/**地图 */
/**博客详情 */
let blogList = new Vue({
  el: "#blog_list",
  data: {
    blogList: []
  },
  computed: {},
  created: function() {
    axios({
      method: "get",
      url: "/queryAllBlog"
    }).then(resp => {
      for (let i = 0; i < resp.data.data.length; i++) {
        resp.data.data[i].link =
          "/blog_detail.html?bid=" + resp.data.data[i].id;
      }
      console.log(resp);
      blogList.blogList = resp.data.data;
    });
  }
});
