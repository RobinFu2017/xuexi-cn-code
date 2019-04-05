module.exports = {
    domContentLoadedThen: async e => "loading" == document.readyState ? new Promise(t => {
        document.addEventListener("DOMContentLoaded", () => t(e()), {once: !0})
    }) : e(),
    getData: async (e = location.href) => {
        const t = e.replace(/\/(\w+)\.html$/, "/data$1.js"), a = await fetch(t, {credentials: "include"}),
            n = (await a.text()).replace("globalCache = ", "").replace(/;$/, "");
        return JSON.parse(n)
    },
    getRandomElement: e => e[Math.floor(Math.random() * e.length)],
    createArrayOf: (e, t) => new Array(t).fill(e),
    getRandomNumberBetween: (e, t) => Math.random() * (t - e) + e,
    getHostname: (e = location.href) => {
        try {
            return new URL(e).hostname
        } catch (e) {
            return ""
        }
    }
};