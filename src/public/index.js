"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const axios_1 = require("axios");
class AppIndex extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cpus: [],
        };
    }
    async componentDidMount() {
        let res = await axios_1.default.get('/install/getOs');
        this.setState(res.data);
    }
    render() {
        let { arch, hostname, platform, uptime, type, freemem, tmpdir, totalmem, release, homedir, cpus, } = this.state;
        return (react_1.createElement("div", null,
            "\u9996\u9875",
            react_1.createElement("table", null,
                react_1.createElement("thead", null),
                react_1.createElement("tbody", null,
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "CPU \u67B6\u6784"),
                        react_1.createElement("td", null, arch)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u4E3B\u673A\u540D"),
                        react_1.createElement("td", null, hostname)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u64CD\u4F5C\u7CFB\u7EDF\u7C7B\u578B"),
                        react_1.createElement("td", null, type)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u64CD\u4F5C\u7CFB\u7EDF\u540D"),
                        react_1.createElement("td", null, platform)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u53D1\u884C\u7248\u672C"),
                        react_1.createElement("td", null, release)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u8FD0\u884C\u65F6\u95F4"),
                        react_1.createElement("td", null,
                            uptime,
                            "\u79D2")),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u603B\u5185\u5B58"),
                        react_1.createElement("td", null, totalmem)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u53EF\u7528\u5185\u5B58"),
                        react_1.createElement("td", null, freemem)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u4E34\u65F6\u76EE\u5F55"),
                        react_1.createElement("td", null, tmpdir)),
                    react_1.createElement("tr", null,
                        react_1.createElement("td", null, "\u4E3B\u76EE\u5F55"),
                        react_1.createElement("td", null, homedir)))),
            react_1.createElement("table", null,
                react_1.createElement("tbody", null, cpus.map((cpu, key) => {
                    return (react_1.createElement("tr", { key: key },
                        react_1.createElement("td", null, cpu.model),
                        react_1.createElement("td", null, cpu.speed),
                        react_1.createElement("td", null, cpu.times.idle),
                        react_1.createElement("td", null, cpu.times.irq),
                        react_1.createElement("td", null, cpu.times.nice),
                        react_1.createElement("td", null, cpu.times.sys),
                        react_1.createElement("td", null, cpu.times.user)));
                })))));
    }
}
exports.AppIndex = AppIndex;
react_dom_1.render(react_1.createElement(AppIndex, null), document.getElementById('app'));
