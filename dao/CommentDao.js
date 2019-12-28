const dbutil = require("./DBUtil");
/**数据库comment */
function insertComment(blogId, parent, parentName, userName, email, comments, ctime, utime, success) {
  var insertSql = "insert into comments (`blog_id`, `parent`, `parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?, ?)";
  var params = [blogId, parent, parentName, userName, email, comments, ctime, utime];

  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}

// insertComment(3,1,"测试回复","null","555@qq.com","你有病","123123","123123",result=>{
//   console.log(result)
// })
/**数据库 通过博客id查评论 */
function queryCommentsByBlogId(blogId, success) {
  const querySql = "select * from comments where blog_id = ?;";
  const params = [blogId];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function(error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

/**数据库 通过博客id查评论总数量 */
function queryCommentsCountByBlogId(blogId, success){
  const querySql = "select count(1) as count from comments where blog_id = ?;";
  const params = [blogId];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function(error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}
/**数据库 通过博客size查最新评论 */
function queryNewComments(size, success) {
  var querySql = "select * from comments order by id desc limit ?;";
  var params = [size];
  var connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, function (error, result) {
      if (error == null) {
          success(result);
      } else {
          console.log(error);
      }
  });
  connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;