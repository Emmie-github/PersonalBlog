const commentDao = require("../dao/CommentDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");
const captcha = require("svg-captcha"); //生成验证码
const path = new Map();

/**Blog评论生成区 */
function addComment(request, response) {
  const params = url.parse(request.url, true).query;
  commentDao.insertComment(
    parseInt(params.bid),
    parseInt(params.parent),
    params.parentName,
    params.userName,
    params.email,
    params.content,
    timeUtil.getNow(),
    timeUtil.getNow(),
    function(result) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "评论成功", null));
      response.end();
    }
  );
}
path.set("/addComment", addComment);

/**评论区验证码随机生成 */
function queryRandomCode(request, response) {
  const img = captcha.create({ fontSize: 50, width: 100, height: 34 });
  //   console.log(img);
  //   response.writeHead(200, { "Content-Type": "image/svg+xml" });
  //   response.write(img.data);
  response.writeHead(200);
  response.write(respUtil.writeResult("success", "评论成功", img));
  response.end();
}
path.set("/queryRandomCode", queryRandomCode);

/**通过博客id查评论 */
function queryCommentsByBlogId(request, response) {
  const params = url.parse(request.url, true).query;
  commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result) {
    // console.log(result);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  });
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

/**通过博客id查评论总数量 */
function queryCommentsCountByBlogId(request, response) {
  const params = url.parse(request.url, true).query;
  commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  });
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

/**通过博客size查最新评论 */
function queryNewComments(request, response) {
  commentDao.queryNewComments(5, function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", result));
    response.end();
  });
}
path.set("/queryNewComments", queryNewComments);

module.exports.path = path;
