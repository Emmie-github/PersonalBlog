const dbutil = require("./DBUtil");

/**数据库-tags 增*/
function insertTag(tag, ctime, utime, success) {
  const insertSql = "insert into tags(tag,ctime,utime) values(?,?,?)";
  const params = [tag, ctime, utime];
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

/**数据库-tags查 */
function queryTag(tag, success) {
  const querySql = "select * from tags where tag = ?;";
  const params = [tag];
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

/**数据库-allTags查 */
function queryAllTag(success) {
  const querySql = "select * from tags;";
  const params = [];
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


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;
