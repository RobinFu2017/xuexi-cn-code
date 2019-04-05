module.exports = function () {
    const {ipcRenderer: s} = require("electron"), {viewArticle: t, getRandomArticleURL: e} = require("./articles.js"), {getRandomVideoURL: a, watchVideo: n} = require("./videos.js");
    let r = [async () => {
        await t(await e(), 0, !0)
    }, t, async () => {
        await t(await e(), 130, !0)
    }, async () => {
        const s = await a();
        location.href = s
    }, n, async () => {
        await n(await a(), 190, !0)
    }];
    const o = {
        _TaskNumbers2Tasks: s => s.map(s => r[s]), _Tasks2TaskNumbers: s => s.map(s => r.indexOf(s)), getAll() {
            const t = s.sendSync("tasks-getAll");
            return o._TaskNumbers2Tasks(t)
        }, set(t) {
            const e = o._Tasks2TaskNumbers(t);
            s.send("tasks-set", e)
        }, add(...t) {
            const e = o._Tasks2TaskNumbers(t);
            s.send("tasks-add", ...e)
        }, get tasks() {
            return o.getAll()
        }, set tasks(s) {
            o.set(s)
        }, * do(s) {
            for (; s.length > 0;) {
                const t = s.shift();
                o.set(s), yield t()
            }
        }, async doAll(s) {
            const t = [];
            for await(let e of o.do(s)) t.push(e);
            return t
        }
    };
    return {TaskList: o, taskTypes: r.concat()}
}();