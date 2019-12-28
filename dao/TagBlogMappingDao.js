const dbutil = require("./DBUtil");

/**数据库-tag<=>blogid映射  增*/
function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
  const insertSql =
    "insert into tag_blog_mapping(tag_id,blog_id,ctime,utime) values(?,?,?,?)";
  const params = [tagId, blogId, ctime, utime];
  const connection = dbutil.createConnection();
  connection.connect();
  connection.query(insertSql, params, function(error, result) {
    if (error == null) {
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

/**数据库-tag  查*/
function queryByTag(tagId, page, pageSize, success) {
  var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?;";
  var params = [tagId, page * pageSize, pageSize];
  var connection = dbutil.createConnection();
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

/**数据库-tag count  查*/
function queryByTagCount(tagId, success) {
  var querySql =
    "select count(1) as count from tag_blog_mapping where tag_id = ?;";
  var params = [tagId];
  var connection = dbutil.createConnection();
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;
