const dbutil = require("./DBUtil");
/**数据库->Blog增 */
function insertBlog(title, content, tags, views, ctime, utime, success) {
  var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
  var params = [title, content, tags, views, ctime, ctime];
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

/**数据库->Blog按页查 */
function queryBlogByPage(page, pageSize, success) {
  const querySql = "select * from blog order by id desc limit ?,?;";
  const params = [page * pageSize, pageSize];
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

/**数据库->Blog查总数 */
function queryBlogCount(success) {
  const querySql = "select count(1) as count from blog;";
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

/**数据库->Blog按id查 */
function queryBlogById(id, success) {
  const querySql = "select * from blog where id = ?;";
  const params = [id];
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

/**数据库->Blog查总Blog数 */
function queryAllBlog(success) {
  const querySql = "select * from blog order by id desc;";
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

/**数据库->Blog 浏览按id自动添加->改 */
function addViews(id, success) {
  const querySql = "update blog set views = views + 1 where id = ?;";
  const params = [id];
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

/**数据库->Blog 最近热门查询->查 */
function queryHotBlog(size, success) {
  const querySql = "select * from blog order by views desc limit ?;";
  const params = [size];
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


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
