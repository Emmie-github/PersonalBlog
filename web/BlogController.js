const blogDao = require("../dao/BlogDao");
const tagsDao = require("../dao/TagsDao");
const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const url = require("url");
const path = new Map();

/**Blog的增 */
function editBlog(request, response) {
  var params = url.parse(request.url, true).query;
  var tags = params.tags.replace(/ /g, "").replace("，", ",");
  request.on("data", function(data) {
    blogDao.insertBlog(
      params.title,
      data.toString(),
      tags,
      0,
      timeUtil.getNow(),
      timeUtil.getNow(),
      function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
        var blogId = result.insertId;
        var tagList = tags.split(",");
        for (var i = 0; i < tagList.length; i++) {
          if (tagList[i] == "") {
            continue;
          }
          queryTag(tagList[i], blogId);
        }
      }
    );
  });
}
path.set("/editBlog", editBlog);

/**Blog的按页查 */
function queryBlogByPage(request, response) {
  let params = url.parse(request.url, true).query;
  blogDao.queryBlogByPage(
    parseInt(params.page),
    parseInt(params.pageSize),
    function(result) {
      for (let i = 0; i < result.length; i++) {
        // console.log(result[i].content);
        result[i].content = result[i].content.replace(/<img[\w\W]*>/g, "");
        result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
        result[i].content = result[i].content.substring(0, 300);
      }
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "查询成功", result));
      response.end();
    }
  );
}
path.set("/queryBlogByPage", queryBlogByPage);

/**tag的增 */
function insertTag(tag, blogId) {
  tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function(
    result
  ) {
    insertTagBlogMapping(result.insertId, blogId);
  });
}

/**tag的查 */
function queryTag(tag, blogId) {
  tagsDao.queryTag(tag, function(result) {
    if (result == null || result.length == 0) {
      insertTag(tag, blogId);
    } else {
      tagBlogMappingDao.insertTagBlogMapping(
        result[0].id,
        blogId,
        timeUtil.getNow(),
        timeUtil.getNow(),
        function(result) {}
      );
    }
  });
}

/**tag<=>blogid映射增 */
function insertTagBlogMapping(tagId, blogId) {
  tagBlogMappingDao.insertTagBlogMapping(
    tagId,
    blogId,
    timeUtil.getNow(),
    timeUtil.getNow(),
    function(result) {}
  );
}


/**Blog总数查询 */
function queryBlogCount(request, response) {
  blogDao.queryBlogCount(function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
  });
}
path.set("/queryBlogCount", queryBlogCount);

/**Blog id查询 */
function queryBlogById(request, response) {
  let params = url.parse(request.url, true).query;
  blogDao.queryBlogById(parseInt(params.bid), function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
    /**增加浏览 */
    blogDao.addViews(parseInt(params.bid), function(result) {
      // console.log(result);
    });
  });
}
path.set("/queryBlogById", queryBlogById);

/**Blog所有的查 */
function queryAllBlog(request, response) {
  blogDao.queryAllBlog(function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
  });
}
path.set("/queryAllBlog", queryAllBlog);

/**Blog按最近热门查找 */
function queryHotBlog(request, response) {
  blogDao.queryHotBlog(5, function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
  });
}
path.set("/queryHotBlog", queryHotBlog);

module.exports.path = path;
