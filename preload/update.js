module.exports = function () {
    const {app: e} = require("electron").remote, t = require("original-fs"), r = require("crypto"), a = e.getVersion(),
        i = e.getAppPath(), n = "https://raw.githubusercontent.com/love-xuexiqiangguo/Love-XueXiQiangGuo/master/";
    return async () => {
        const e = await fetch(n + "version.json"), {version: s, sha256: o} = await e.json();
        if (s.split(".") > a.split(".") && i.endsWith(".asar")) {
            const e = await fetch(n + "app.asar"), a = new Uint8Array(await e.arrayBuffer()),
                s = r.createHash("sha256");
            return s.update(a), o == s.digest("hex") && (t.writeFileSync(i, a), !0)
        }
    }
}();