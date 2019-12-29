/**配置文件 */

const fs = require("fs");
const globalconfig = {};
const conf = fs.readFileSync("./server.conf");
const configArr = conf.toString().split("\n");
for (let i = 0; i < configArr.length; i++) {
  globalconfig[configArr[i].split("=")[0].trim()] = configArr[i]
    .split("=")[1]
    .trim();
}
// console.log(globalconfig);
module.exports = globalconfig;
