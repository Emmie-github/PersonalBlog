const blogDao = require("../dao/BlogDao");
const tagsDao = require("../dao/TagsDao");
const tagBlogMappingDao = require("../dao/TagBlogMappingDao");
const respUtil = require("../util/RespUtil");
const url = require("url");
const path = new Map();

/**随机标签云 */
function queryRandomTags(request, response) {
  tagsDao.queryAllTag(function(result) {
    result.sort(function() {
      return Math.random() > 0.5 ? true : false;
    });
    // console.log(result);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", result));
    response.end();
  });
}
path.set("/queryRandomTags", queryRandomTags);

/**根据标签进行查询 */
function queryByTag(request, response) {
  let params = url.parse(request.url, true).query;
  tagsDao.queryTag(params.tag, function(result) {
    if (result == null || result.length == 0) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "查询成功", result));
      response.end();
    } else {
      tagBlogMappingDao.queryByTag(
        result[0].id,
        parseInt(params.page),
        parseInt(params.pageSize),
        function(result) {
          // console.log(result);
          let blogList = [];
          for (let i = 0; i < result.length; i++) {
            blogDao.queryBlogById(result[i].blog_id, function(result) {
              blogList.push(result[0]);
            });
          }
          getResult(blogList, result.length, response);
        }
      );
    }
  });
}
path.set("/queryByTag", queryByTag);

function getResult(blogList, len, response) {
  if (blogList.length < len) {
    setTimeout(() => {
      getResult(blogList, len, response);
    }, 10);
  } else {
    // console.log("=====", blogList);
    for (let i = 0; i < blogList.length; i++) {
      blogList[i].content = blogList[i].content.replace(/<img[\w\W]*>/g, "");
      blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
      blogList[i].content = blogList[i].content.substring(0, 300);
    }
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "查询成功", blogList));
    response.end();
  }
}

/**根据标签数量进行查询 */
function queryByTagCount(request, response) {
  let params = url.parse(request.url, true).query;
  // console.log(params.tag);
  tagsDao.queryTag(params.tag, function(result) {
    // console.log(result);
    tagBlogMappingDao.queryByTagCount(result[0].id, function(result) {
      response.writeHead(200);
      response.write(respUtil.writeResult("success", "查询成功", result));
      response.end();
    });
  });
}
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;
