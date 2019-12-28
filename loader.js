/**加载web层文件 */
const fs = require("fs");
const globalconfig = require("./config");
const controllerSet = [];
const pathMap = new Map();
const files = fs.readdirSync(globalconfig["web_path"]);
for (let i = 0; i < files.length; i++) {
  const temp = require("./" + globalconfig["web_path"] + "/" + files[i]);
  if (temp.path) {
    for (const [key, value] of temp.path) {
      if (pathMap.get(key) == null) {
        pathMap.set(key, value);
      } else {
        throw new Error("url path异常,url:" + key);
      }
    }
    controllerSet.push(temp);
  }
}
module.exports = pathMap;
