module.exports = function () {
    const e = require("./paths.js"), {getData: t, getRandomElement: o, getRandomNumberBetween: n} = require("./util.js"),
        i = async () => {
            return (await t(e.videosPage)).fp2t40yxso9xk0013.list2
        }, a = async () => {
            const e = await i();
            return o(e)
        }, r = async () => (await a()).static_page_url;
    return {
        getVideoList: i, getRandomVideo: a, getRandomVideoURL: r, watchVideo: async (e = r(), t = 70, o = !0) => {
            const i = await e;
            window.scrollBy({top: window.innerHeight + n(-20, 20), behavior: "smooth"});
            const a = window.setInterval(() => {
                window.scrollBy({top: n(-10, 10), behavior: "smooth"})
            }, 1e3);
            if (await new Promise(e => {
                const t = new MutationObserver(() => {
                    const o = document.querySelector("video"), n = document.querySelector("#alertBox");
                    o ? (t.disconnect(), e(o)) : (n && n.textContent.includes("正在维护") || !window.Aliplayer) && e(null)
                });
                t.observe(document, {childList: !0, subtree: !0}), setTimeout(() => {
                    t.disconnect(), e(null)
                }, 5e3)
            })) {
                let e = 1e3 * t;
                o && (e += 10 * Math.random() * 1e3), e > 0 && await new Promise(t => {
                    setTimeout(t, e)
                })
            }
            window.clearInterval(a), location.href = i
        }
    }
}();