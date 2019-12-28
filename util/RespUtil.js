/**返回结果->状态、信息、数据 */
function writeResult(status, msg, data) {
  return JSON.stringify({ status: status, msg: msg, data: data });
}
module.exports.writeResult = writeResult;
