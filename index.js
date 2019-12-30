/**首页->运行 */
const express = require("express");
const globalconfig = require("./config");
const loader = require("./loader");
const app = new express();
app.use(express.static("page"));


/**每日一句增、查 */
app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

/**文章增、查 */
app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));

/**总页数查询 */
app.get("/queryBlogCount", loader.get("/queryBlogCount"));

/**id查询 */
app.get("/queryBlogById", loader.get("/queryBlogById"));

/**写评论 */
app.get("/addComment", loader.get("/addComment"));

/**生成验证码 */
app.get("/queryRandomCode", loader.get("/queryRandomCode"));

/**通过博客id查评论 */
app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));

/**通过博客id查评论数量 */
app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"));

/**查找所有博客 */
app.get("/queryAllBlog", loader.get("/queryAllBlog"));

/**查找随机标签云 */
app.get("/queryRandomTags", loader.get("/queryRandomTags"));

/**查找最近热门 */
app.get("/queryHotBlog", loader.get("/queryHotBlog"));

/**查找最近评论 */
app.get("/queryNewComments", loader.get("/queryNewComments"));

/**通过标签查询 */
app.get("/queryByTag", loader.get("/queryByTag"));

/**通过标签数量查询 */
app.get("/queryByTagCount", loader.get("/queryByTagCount"));

/**通过标题查询 */
// app.get("/queryBlogBySearch", loader.get("/queryBlogBySearch"));

app.listen(globalconfig.port, function() {
  console.log("服务器已启动");
});
