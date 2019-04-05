module.exports = function () {
    const e = require("./paths.js"), {ipcRenderer: t} = require("electron"), {domContentLoadedThen: o, createArrayOf: i, getHostname: n} = require("./util.js"), {onLogin: s, isLoggedIn: r, onAutoLogin: a} = require("./login.js"), {getUsableScoreMethods: d, isDone: c, getTheGapOf: l, showScore: g} = require("./score.js"), {lock: u, unlock: h, islocked: f} = require("./lock.js"), {TaskList: k, taskTypes: p} = require("./tasks.js"),
        m = require("./update.js"), q = ["oapi.dingtalk.com", "login.dingtalk.com", "h5.dingtalk.com"],
        j = "https://login.dingtalk.com/login/index.htm?goto=" + encodeURIComponent(e.passwdLoginPage);
    o(async () => {
        const o = t.sendSync("getAutoLoginSettings");
        if (location.href.startsWith(e.loginPage)) return s(), void m();
        if (location.href.startsWith(j) && o) return void a(o);
        if (q.includes(n())) return;
        if (!r()) return void(location.href = o ? j : "https://pc.xuexi.cn/points/login.html?ref=https://www.xuexi.cn/");
        if (t.send("save-cookies"), !f()) {
            const [t, o, n, s] = await d();
            if (k.tasks = [], c(t) && c(n) || k.add(p[0]), k.add(...i(p[1], l(t)), ...i(p[2], l(n))), c(o) && c(s) || k.add(p[3]), k.add(...i(p[4], l(o)), ...i(p[5], l(s))), 0 == k.tasks.length) return;
            if (u(), location.href.startsWith(e.myStudyPage)) return void(location.href = e.homePage)
        }
        g();
        const L = k.getAll();
        k.doAll(L), 0 == L.length && h()
    })
}();