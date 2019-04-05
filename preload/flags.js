module.exports = function () {
    const {app: e} = require("electron"),
        n = `\nLove 学习强国 v${e.getVersion()}\n\n\n一款帮助成年人（或许未来包括小朋友）自动学刁的软件\n\nUsage: ./Love学习强国 [options]\n\nOptions:\n    -v, --version        输出版本号\n    -h, --help           输出帮助信息\n    --headless           无头模式 （没有图形窗口，在命令行界面中显示二维码）\n    --dev                开发者模式\n    --multi-user         多用户模式 （随机生成用户ID，与下方命令行选项冲突，下方的拥有更高优先级）（在程序多开时自动使用）\n    --user=<id>          多用户模式 （使用指定的用户ID，作用是区分用户，可随便填写）\n    --ua=<user_agent>    使用自定义 User Agent 启动程序\n    --username=<phone_number> ,\n    --passwd=<password>  使用用户名（手机号，如果是外国手机号，请以 +1-xxxxxxxxxx 的格式输入）密码自动登录\n`,
        s = (e, n) => {
            try {
                const s = new RegExp(`^--${e}=(.+)$`);
                return n.find(e => s.test(e)).match(s)[1]
            } catch (e) {
                return null
            }
        };
    return (u = process.argv) => {
        const i = u.includes("headless") || u.includes("--headless"), r = u.includes("dev") || u.includes("--dev"),
            t = u.includes("multi-user") || u.includes("--multi-user"), l = s("user", u), o = s("username", u),
            c = s("passwd", u), d = o && c ? {userName: o, passwd: c} : null, a = s("ua", u);
        return u.includes("--version") || u.includes("-v") ? (console.log(e.getVersion()), e.quit(), {}) : u.includes("--help") || u.includes("-h") ? (console.log(n), e.quit(), {}) : {
            headless: i,
            dev: r,
            multiUser: t,
            userID: l,
            UA: a,
            autoLoginSettings: d
        }
    }
}();