!function () {
    const e = require("path");
    const {app: app, BrowserWindow: browser, ipcMain: ipc, Menu: menu} = require("electron");
    const {getRandomNumberBetween: a} = require("./preload/util.js"),
        r = require("./preload/flags.js");
    let l = null, i = !1;
    const {headless: u, dev: c, multiUser: d, userID: w, UA: p, autoLoginSettings: g} = r();
    let m = void 0;
    w ? m = `persist:${w}` : g && g.userName ? m = `persist:user-${g.userName}` : !d && app.requestSingleInstanceLock() || (m = `${Math.random()}`);
    const b = e => {
        menu.setApplicationMenu(menu.buildFromTemplate(e))
    }, h = [{label: "fxm学习强国"}, {label: `v${app.getVersion()}`}, {label: "如果觉得好就去支付宝给小学生捐钱吧~"}];
    let k = [];
    app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required"), app.on("window-all-closed", function () {
        app.quit()
    }), app.on("ready", function () {
        if (l = new browser({
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
    }), ipc.on("lock", () => {
        i = !0
    }), ipc.on("unlock", () => {
        i = !1
    }), ipc.on("islocked", e => {
        e.returnValue = i
    });
    let f = [];
    ipc.on("tasks-getAll", e => {
        e.returnValue = f
    }), ipc.on("tasks-set", (e, n) => {
        f = n
    }), ipc.on("tasks-add", (e, ...n) => {
        c && console.log(n), f.push(...n)
    }), ipc.on("isHeadless", e => {
        e.returnValue = u
    }), ipc.on("log", (e, ...n) => {
        console.log(...n)
    });
    ipc.on("save-cookies", async () => {
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
    }), ipc.on("getAutoLoginSettings", e => {
        e.returnValue = g
    }), ipc.on("refresh-menu", (e, n) => {
        if (n.score) {
            const {today: e, total: o, types: t} = n.score;
            k = [{label: `今日积分: ${e}`}, {label: `总积分: ${o}`}, ...t.map(e => ({label: `${e}`}))]
        }
        b([...h, ...k])
    })
}();