module.exports = function () {
    const t = require("./paths.js"), {getData: e, getRandomElement: a, getRandomNumberBetween: n} = require("./util.js"),
        o = async () => {
            const a = await e(t.articlesPage);
            return Object.values(a)[0].list
        }, i = async () => {
            const t = await o();
            return a(t)
        }, r = async () => (await i()).static_page_url;
    return {
        getArticleList: o,
        getRandomArticle: i,
        getRandomArticleURL: r,
        viewArticle: async (t = r(), e = 70, a = !0) => {
            const o = await t;
            window.scrollBy({top: window.innerHeight + n(-20, 20), behavior: "smooth"});
            const i = window.setInterval(() => {
                window.scrollBy({top: n(-5, 10), behavior: "smooth"})
            }, 1e3);
            let s = 1e3 * e;
            a && (s += 10 * Math.random() * 1e3), s > 0 && await new Promise(t => {
                setTimeout(t, s)
            }), window.clearInterval(i), location.href = o
        }
    }
}();