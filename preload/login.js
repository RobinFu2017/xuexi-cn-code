module.exports = function () {
    const {ipcRenderer: e} = require("electron"),
        o = require("./qrcode.js"), {passwdLoginPage: t} = require("./paths.js"), {getRandomNumberBetween: n} = require("./util.js"),
        r = document.createElement.bind(document), c = async () => {
            const t = await new Promise(e => {
                const o = new MutationObserver(() => {
                    const t = document.querySelector("#ddlogin-iframe");
                    t && (o.disconnect(), e(t.contentWindow))
                });
                o.observe(document.querySelector("#ddlogin"), {childList: !0})
            }), n = await new Promise(e => {
                const o = setInterval(() => {
                    t.currentCode && (e(t.currentCode), clearInterval(o))
                }, 1e3)
            });
            (e => {
                const o = e.document.querySelector(".login_qrcode_refresh");
                new MutationObserver(() => {
                    "block" == o.style.display && top.location.reload()
                }).observe(o, {attributes: !0})
            })(t);
            const r = new URL(t.GOTO).searchParams, c = r.get("appid"), d = r.get("redirect_uri"),
                s = `https://oapi.dingtalk.com/connect/qrcommit?showmenu=false&code=${n}&appid=${c}&redirect_uri=${encodeURIComponent(d)}`,
                i = await o.generatePromise(s, {small: !0});
            return console.log(s), e.send("log", `\n请使用学习强国APP扫码登录:\n${i}\n`), e.send("log", `或者使用学习强国APP打开此链接:\n${s}\n`), s
        }, d = /^(?:(\+\d+)-)?(\d+)$/;
    return {
        onLogin: () => {
            document.querySelectorAll(".header, .redflagbox, .footer").forEach(e => {
                e.style.display = "none"
            }), e.sendSync("isHeadless") && c();
            const o = r("a");
            o.href = t, o.style.color = "#2db7f5", o.text = "使用用户名和密码登录", document.querySelector(".ddlogintext").append(r("br"), r("br"), o), [document.documentElement, document.body].forEach(e => {
                e.style.minWidth = "unset"
            })
        }, isLoggedIn: () => document.cookie.includes("token="), onAutoLogin: e => {
            if (!e) return;
            const {userName: o, passwd: t} = e, r = o.match(d);
            if (!r) return;
            const c = r[1], s = r[2], i = document.querySelector("#mobile"), l = document.querySelector("#pwd");
            [i, l].forEach(e => e.previousElementSibling.click()), i.value = s, l.value = t, c && (document.querySelector("#countryCode").value = c);
            const u = document.querySelector("#loginBtn");
            setTimeout(() => {
                u.click()
            }, 1e3 * (10 + n(0, 3)))
        }
    }
}();