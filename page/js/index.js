/**首页-内容区左侧 */

// 每日一句
var everyDay = new Vue({
  el: "#every_day",
  data: {
    content: "May the odds be ever in your favor.",
    date: "2019-12-22"
  },
  computed: {
    getDate: function() {
      return this.date;
    },
    getContent: function() {
      return this.content;
    }
  },
  created: function() {
    //请求数据,给content赋值
    axios({
      method: "get",
      url: "/queryEveryDay"
    })
      .then(resp => {
        console.log(resp);
        everyDay.content = resp.data.data[0].content;
        everyDay.date = new Date(
          resp.data.data[0].ctime * 1000
        ).toLocaleDateString();
      })
      .catch(resp => {
        console.log("请求失败");
      });
  }
});

// 文章
var articleList = new Vue({
  el: "#article_list",
  data: {
    page: 1,
    pageSize: 5,
    count: 0,
    pageNumList: [],
    articleList: [
      {
        title: "Laravel5.4安装passport时遇到的一些问题",
        content:
          "安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加LaravelPassportPassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...",
        date: "2019-12-22",
        views: "101",
        tags: "test1 test2",
        id: "1",
        link: ""
      }
    ]
  },
  computed: {
    /**跳到指定页码 */
    jumpTo: function() {
      return function(page) {
        this.getPage(page, this.pageSize);
      };
    },
    /**取页码 */
    getPage: function() {
      return function(page, pageSize) {
        let searchUrlParams =
          location.search.indexOf("?") > -1
            ? location.search.split("?")[1].split("&")
            : "";
        let tag = "";
        for (let i = 0; i < searchUrlParams.length; i++) {
          if (searchUrlParams[i].split("=")[0] == "tag") {
            try {
              tag = searchUrlParams[i].split("=")[1];
            } catch (e) {
              console.log(e);
            }
          }
        }
        if (tag == "") {
          //不是查询情况
          axios({
            method: "get",
            url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
          })
            .then(resp => {
              console.log(resp);
              let result = resp.data.data;
              let list = [];
              for (let i = 0; i < result.length; i++) {
                let temp = {};
                temp.title = result[i].title;
                temp.content = result[i].content;
                temp.date = new Date(
                  result[i].ctime * 1000
                ).toLocaleDateString();
                temp.views = result[i].views;
                temp.tags = result[i].tags;
                temp.id = result[i].id;
                temp.link = "/blog_detail.html?bid=" + result[i].id;
                list.push(temp);
              }
              articleList.articleList = list;
              articleList.page = page;
            })
            .catch(resp => {
              console.log("请求错误");
            });
          axios({
            method: "get",
            url: "/queryBlogCount"
          }).then(resp => {
            console.log(resp);
            articleList.count = resp.data.data[0].count;
            articleList.generatePageTool;
          });
        } else {
          axios({
            method: "get",
            url:
              "/queryByTag?page=" +
              (page - 1) +
              "&pageSize=" +
              pageSize +
              "&tag=" +
              tag
          })
            .then(resp => {
              console.log(resp);
              var result = resp.data.data;
              var list = [];
              for (var i = 0; i < result.length; i++) {
                var temp = {};
                temp.title = result[i].title;
                temp.content = result[i].content;
                temp.date = result[i].ctime;
                temp.views = result[i].views;
                temp.tags = result[i].tags;
                temp.id = result[i].id;
                temp.link = "/blog_detail.html?bid=" + result[i].id;
                list.push(temp);
              }
              articleList.articleList = list;
              articleList.page = page;
            })
            .catch(resp => {
              console.log("请求错误");
            });
          axios({
            method: "get",
            url: "/queryByTagCount?tag=" + tag
          }).then(resp => {
            console.log(resp);
            articleList.count = resp.data.data[0].count;
            articleList.generatePageTool;
          });
        }
      };
    },
    /**页码生成器 */
    generatePageTool: function() {
      let nowPage = this.page;
      let pageSize = this.pageSize;
      let totalCount = this.count;
      let result = [];
      result.push({ text: "<<", page: 1 });
      if (nowPage > 2) {
        result.push({ text: nowPage - 2, page: nowPage - 2 });
      }
      if (nowPage > 1) {
        result.push({ text: nowPage - 1, page: nowPage - 1 });
      }
      result.push({ text: nowPage, page: nowPage });
      if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({ text: nowPage + 1, page: nowPage + 1 });
      }
      if (nowPage + 2 <= (totalCount + pageSize - 2) / pageSize) {
        result.push({ text: nowPage + 2, page: nowPage + 2 });
      }
      result.push({
        text: ">>",
        page: parseInt((totalCount + pageSize - 2) / pageSize)
      });
      this.pageNumList = result;
      return result;
    }
  },
  created: function() {
    //请求数据,给articleList赋值
    this.getPage(this.page, this.pageSize);
  }
});

//搜所
var searchBar = new Vue({
  el: "#search_bar",
  data: {
    input: ""
  },
  computed: {},
  methods: {
    //请求数据,给search赋值
    sendSearch: function() {
      console.log("===");
      let input = document.querySelector("input").value;
      axios({
        url: "/queryBlogByValue?value=" + input
      }).then(resp => {
        console.log(resp);
        articleList.count = resp.data.data.count;
        articleList.generatePageTool.nowPage = 1;
        articleList.generatePageTool;
        articleList.articleList = resp.data.data;
      });
    }
  }
});
