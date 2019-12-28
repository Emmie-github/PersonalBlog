/**内容区右侧 */

// 随机标签云
var randomTags = new Vue({
  el: "#random_tags",
  data: {
    tags: [
      "wordpress",
      "dedecms",
      "mysql",
      "独立博客",
      "指针",
      "摄像头",
      "C语言",
      "telnet",
      "外链",
      "SpaceShuttleMission",
      "wordpress",
      "dedecms",
      "mysql",
      "独立博客",
      "指针",
      "摄像头",
      "C语言",
      "telnet",
      "外链",
      "SpaceShuttleMission"
    ]
  },
  computed: {
    randomColor: function() {
      return function() {
        var red = Math.random() * 255;
        var green = Math.random() * 255;
        var blue = Math.random() * 255;
        return "rgb(" + red + "," + green + "," + blue + ")";
      };
    },
    randomSize: function() {
      return function() {
        var size = Math.random() * 20 + 12 + "px";
        return size;
      };
    }
  },
  created: function() {
    axios({
      method: "get",
      url: "/queryRandomTags"
    }).then(resp => {
      console.log(resp);
      let result = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        result.push({
          text: resp.data.data[i].tag,
          link: "/?tag=" + resp.data.data[i].tag
        });
      }
      randomTags.tags = result;
    });
  }
});
// 最近热门
var newHot = new Vue({
  el: "#new_hot",
  data: {
    titleList: []
  },
  created: function() {
    axios({
      method: "get",
      url: "/queryHotBlog"
    }).then(resp => {
      console.log(resp);
      let result = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        let temp = {};
        temp.title = resp.data.data[i].title;
        temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
        result.push(temp);
      }
      newHot.titleList = result;
    });
  }
});
// 最新评论
var newComments = new Vue({
  el: "#new_comments",
  data: {
    commentList: [
      {
        name: "这里是用户名",
        date: "2019-12-22",
        comment: "这里是一大串评论，巴拉巴拉"
      },
      {
        name: "这里是用户名",
        date: "2019-12-22",
        comment: "这里是一大串评论，巴拉巴拉"
      },
      {
        name: "这里是用户名",
        date: "2019-12-22",
        comment: "这里是一大串评论，巴拉巴拉"
      },
      {
        name: "这里是用户名",
        date: "2019-12-22",
        comment: "这里是一大串评论，巴拉巴拉"
      },
      {
        name: "这里是用户名",
        date: "2019-12-22",
        comment: "这里是一大串评论，巴拉巴拉"
      }
    ]
  },

  created: function() {
    axios({
      method: "get",
      url: "/queryNewComments"
    }).then(resp => {
      console.log(resp);
      let result = [];
      for (let i = 0; i < resp.data.data.length; i++) {
        let temp = {};
        temp.name = resp.data.data[i].user_name;
        temp.date = new Date(
          resp.data.data[i].ctime * 1000
        ).toLocaleDateString();
        temp.comment = resp.data.data[i].comments;
        result.push(temp);
      }
      newComments.commentList = result;
    });
  }
});
