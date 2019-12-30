/**博客详情页面 */
let blogDetail = new Vue({
  el: "#blog_detail",
  data: {
    title: "",
    content: "",
    ctime: "",
    tags: "",
    views: ""
  },
  computed: {},
  created: function() {
    let searchUrlParams =
      location.search.indexOf("?") > -1
        ? location.search.split("?")[1].split("&")
        : "";
    if (searchUrlParams == "") {
      return;
    }
    let bid = -1;
    for (let i = 0; i < searchUrlParams.length; i++) {
      if (searchUrlParams[i].split("=")[0] == "bid") {
        try {
          bid = parseInt(searchUrlParams[i].split("=")[1]);
        } catch (e) {
          console.log(e);
        }
      }
    }
    axios({
      method: "get",
      url: "/queryBlogById?bid=" + bid
    })
      .then(resp => {
        console.log(resp);
        let result = resp.data.data[0];
        blogDetail.title = result.title;
        blogDetail.content = result.content;
        blogDetail.ctime =new Date(result.ctime*1000).toLocaleDateString();
        blogDetail.tags = result.tags;
        blogDetail.views = result.views;
      })
      .catch(resp => {
        console.log("请求失败");
      });
  }
});

/**博客评论提交区 */
let sendComment = new Vue({
  el: "#send_comment",
  data: {
    vcode: "",
    rightCode: ""
  },
  computed: {
    changeCode: function() {
      return function() {
        axios({
          method: "get",
          url: "/queryRandomCode"
        }).then(resp => {
          // console.log(resp);
          sendComment.vcode = resp.data.data.data;
          sendComment.rightCode = resp.data.data.text;
        });
      };
    },
    sendComment: function() {
      return function() {
        let code = document.getElementById("comment_code").value;
        if (code != sendComment.rightCode) {
          alert("验证码有误");
          return;
        }
        let searchUrlParams =
          location.search.indexOf("?") > -1
            ? location.search.split("?")[1].split("&")
            : "";
        let bid = -10;
        for (let i = 0; i < searchUrlParams.length; i++) {
          if (searchUrlParams[i].split("=")[0] == "bid") {
            try {
              bid = parseInt(searchUrlParams[i].split("=")[1]);
            } catch (e) {
              console.log(e);
            }
          }
        }
        let reply = document.getElementById("comment_reply").value;
        let replyName = document.getElementById("comment_reply_name").value;
        let name = document.getElementById("comment_name").value;
        let email = document.getElementById("comment_email").value;
        let content = document.getElementById("comment_content").value;
        axios({
          method: "get",
          url:
            "/addComment?bid=" +
            bid +
            "&parent=" +
            reply +
            "&userName=" +
            name +
            "&email=" +
            email +
            "&content=" +
            content +
            "&parentName=" +
            replyName
        }).then(resp => {
          console.log(resp);
          alert(resp.data.msg);
        });
      };
    }
  },
  created: function() {
    this.changeCode();
  }
});

/**博客评论显示区 */
let blogComments = new Vue({
  el: "#blog_comments",
  data: {
    total: 0,
    comments: []
  },
  computed: {
    reply: function() {
      return function(commentId, userName) {
        document.getElementById("comment_reply").value = commentId;
        document.getElementById("comment_reply_name").value = userName;
        location.href = "#send_comment";
      };
    }
  },
  created: function() {
    let searchUrlParams =
      location.search.indexOf("?") > -1
        ? location.search.split("?")[1].split("&")
        : "";
    let bid = -10;
    for (let i = 0; i < searchUrlParams.length; i++) {
      if (searchUrlParams[i].split("=")[0] == "bid") {
        try {
          bid = parseInt(searchUrlParams[i].split("=")[1]);
        } catch (e) {
          console.log(e);
        }
      }
    }
    axios({
      method: "get",
      url: "/queryCommentsByBlogId?bid=" + bid
    }).then(resp => {
      console.log(resp);
      resp.data.data.map(v => {
        v.ctime = new Date(v.ctime * 1000).toLocaleString();
      });
      blogComments.comments = resp.data.data;
      for (let i = 0; i < blogComments.comments.length; i++) {
        if (blogComments.comments[i].parent > -1) {
          blogComments.comments[i].options =
            "回复@" + blogComments.comments[i].parent_name;
        }
      }
    });
    axios({
      method: "get",
      url: "/queryCommentsCountByBlogId?bid=" + bid
    })
      .then(resp => {
        console.log(resp);
        blogComments.total = resp.data.data[0].count;
      })
      .catch(resp => {
        console.log("请求错误");
      });
  }
});
