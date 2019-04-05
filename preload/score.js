module.exports = function () {
    const {ipcRenderer: e} = require("electron"), r = async (e = !1) => {
        const r = e ? "https://pc-api.xuexi.cn/open/api/score/today/query" : "https://pc-api.xuexi.cn/open/api/score/get",
            t = await fetch(r, {credentials: "include"}), o = await t.json();
        if (200 != o.code) throw new Error(o.error);
        return o.data.score
    }, t = async () => {
        const e = await fetch("https://pc-api.xuexi.cn/open/api/score/today/queryrate", {credentials: "include"}),
            r = await e.json();
        if (200 != r.code) throw new Error(r.error);
        return r.data
    }, o = e => e.currentScore >= e.dayMaxScore, a = (e, r) => r.map(r => e.find(e => e.name == r)), c = async () => {
        const e = await t();
        return a(e, ["阅读文章", "观看视频", "文章时长", "视频时长"])
    };
    return {
        getScore: r,
        getScoreMethods: t,
        isDone: o,
        getTheGapOf: e => o(e) ? 0 : e.dayMaxScore - e.currentScore,
        findScoreMethodsByNames: a,
        getUsableScoreMethods: c,
        showScore: async () => {
            const t = await r(!0), o = await r(), a = (new Date).toLocaleString("zh-CN", {hour12: !1}),
                n = (await c()).map(e => e.name + "积分: " + e.currentScore + " / " + e.dayMaxScore),
                s = `${a} 今日积分: ${t} 总积分: ${o} ${n.join(" ")}`;
            e.send("log", s);
            const i = {today: t, total: o, types: n};
            return e.send("refresh-menu", {score: i}), i
        }
    }
}();