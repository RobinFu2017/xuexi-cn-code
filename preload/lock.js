module.exports = function () {
    const {ipcRenderer: e} = require("electron"), n = () => {
        e.send("lock")
    }, c = () => {
        e.send("unlock")
    }, o = () => e.sendSync("islocked");
    return {lock: n, unlock: c, islocked: o}
}();