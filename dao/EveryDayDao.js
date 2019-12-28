const dbutil = require("./DBUtil");

/**数据库->EveryDay增 */
function insertEveryDay(content, ctime, success) {
 const insertSql = "insert into every_day(content,ctime) values(?,?)";
 const params = [content, ctime];
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

/**数据库->EveryDay查 */
function queryEveryDay(success) {
 const querySql = "select * from every_day order by id desc limit 1;";
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

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;
