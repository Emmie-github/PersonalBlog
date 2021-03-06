/**EveryDay */

const everyDayDao = require("../dao/EveryDayDao");
const timeUtil = require("../util/TimeUtil");
const respUtil = require("../util/RespUtil");
const path = new Map();

/**everyday的增 */
function editEveryDay(request, response) {
  request.on("data", function(data) {
    // console.log(data.toString().trim());
    everyDayDao.insertEveryDay(
      data.toString().trim(),
      timeUtil.getNow(),
      function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
      }
    );
  });
}
path.set("/editEveryDay", editEveryDay);
/**everyday的查 */
function queryEveryDay(request, response) {
  everyDayDao.queryEveryDay(function(result) {
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "添加成功", result));
    response.end();
  });
}
path.set("/queryEveryDay", queryEveryDay);
module.exports.path = path;
