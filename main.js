!function () {
    const e = require("path"), {app: n, BrowserWindow: o, ipcMain: t, Menu: s} =
            require("electron"), {getRandomNumberBetween: a} = require("./preload/util.js"),
        r = require("./preload/flags.js");
    let l = null, i = !1;
    const {headless: u, dev: c, multiUser: d, userID: w, UA: p, autoLoginSettings: g} = r();
    let m = void 0;
    w ? m = `persist:${w}` : g && g.userName ? m = `persist:user-${g.userName}` : !d && n.requestSingleInstanceLock() || (m = `${Math.random()}`);
    const b = e => {
        s.setApplicationMenu(s.buildFromTemplate(e))
    }, h = [{label: "Love学习强国"}, {label: `v${n.getVersion()}`}];
    let k = [];
    n.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required"), n.on("window-all-closed", function () {
        n.quit()
    }), n.on("ready", function () {
        if (l = new o({
            title: "Love 学习强国",
            width: 1e3,
            height: 600,
            show: !1,
            icon: e.join(__dirname, "logo.png"),
            webPreferences: {
                nodeIntegration: !1,
                webSecurity: !u,
                preload: e.join(__dirname, "preload/preload.js"),
                partition: m,
                backgroundThrottling: !1
            }
        }), b(h), c && l.webContents.openDevTools(), p) l.webContents.setUserAgent(p); else {
            const e = l.webContents.getUserAgent().replace(/\w+-xuexiqiangguo.+? /, "").replace(/Electron.+? /, "");
            l.webContents.setUserAgent(e)
        }
        l.loadURL("https://www.xuexi.cn/"), l.once("ready-to-show", () => {
            l.show()
        }), l.on("closed", () => {
            l = null
        }), l.webContents.on("new-window", (e, n) => {
            e.preventDefault(), l.webContents.loadURL(n)
        }), l.webContents.setAudioMuted(!0), setInterval(async () => {
            await new Promise(e => {
                setTimeout(() => {
                    e()
                }, 1e3 * a(0, 2e3))
            }), i || l.webContents.reload()
        }, 864e5)
    }), t.on("lock", () => {
        i = !0
    }), t.on("unlock", () => {
        i = !1
    }), t.on("islocked", e => {
        e.returnValue = i
    });
    let f = [];
    t.on("tasks-getAll", e => {
        e.returnValue = f
    }), t.on("tasks-set", (e, n) => {
        f = n
    }), t.on("tasks-add", (e, ...n) => {
        c && console.log(n), f.push(...n)
    }), t.on("isHeadless", e => {
        e.returnValue = u
    }), t.on("log", (e, ...n) => {
        console.log(...n)
    });
    t.on("save-cookies", async () => {
        const e = l.webContents.session.cookies, n = l.webContents.getURL(), o = +new Date / 1e3 + 31536e4, t = t => {
            e.set({url: n, ...t, expirationDate: o}, e => {
                if (e) throw e
            })
        };
        e.on("changed", (e, n, o) => {
            "__UID__" != n.name && "token" != n.name || !("expired" == o || "explicit" == o && (e => (e - +new Date / 1e3) / 86400 / 365)(n.expirationDate) < 8) || (c && console.log([e, n, o]), t(n))
        }), (await(() => new Promise((n, o) => {
            e.get({domain: "xuexi.cn"}, (e, t) => {
                e ? o(e) : n(t.filter(e => "__UID__" == e.name || "token" == e.name))
            })
        }))()).forEach(e => {
            t(e)
        })
    }), t.on("getAutoLoginSettings", e => {
        e.returnValue = g
    }), t.on("refresh-menu", (e, n) => {
        if (n.score) {
            const {today: e, total: o, types: t} = n.score;
            k = [{label: `今日积分: ${e}`}, {label: `总积分: ${o}`}, ...t.map(e => ({label: `${e}`}))]
        }
        b([...h, ...k])
    })
}();