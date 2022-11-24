/* 语法说明

::: tip 提示
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

*/

const tipsConf = {
    tip: {
        icon: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSI4IiBmaWxsPSIjMTU4ODMxIi8+PHBhdGggZD0iTTUgNS44NTkwOUM1IDYuMjczMyA1LjMzNTc5IDYuNjA5MDkgNS43NSA2LjYwOTA5QzYuMTY0MjEgNi42MDkwOSA2LjUgNi4yNzMzIDYuNSA1Ljg1OTA5SDVaTTcuMjUgOS4yNUM3LjI1IDkuNjY0MjEgNy41ODU3OSAxMCA4IDEwQzguNDE0MjEgMTAgOC43NSA5LjY2NDIxIDguNzUgOS4yNUg3LjI1Wk04LjEwMDA2IDcuOTY2MTNMOC4wNjkzMiA3LjIxNjc2TDguMTAwMDYgNy45NjYxM1pNOS41IDUuODU5MDlDOS41IDYuNTQ2MjkgOC45MDkgNy4xODIzMiA4LjA2OTMyIDcuMjE2NzZMOC4xMzA4IDguNzE1NUM5LjY4MzUzIDguNjUxODEgMTEgNy40Mzg2NyAxMSA1Ljg1OTA5SDkuNVpNNi41IDUuODU5MDlDNi41IDUuMTUzNDQgNy4xMjUxNCA0LjUgOCA0LjVWM0M2LjM4OTU4IDMgNSA0LjIzNTExIDUgNS44NTkwOUg2LjVaTTggNC41QzguODc0ODYgNC41IDkuNSA1LjE1MzQ0IDkuNSA1Ljg1OTA5SDExQzExIDQuMjM1MTEgOS42MTA0MiAzIDggM1Y0LjVaTTcuMjUgOC4wNjgxOFY5LjI1SDguNzVWOC4wNjgxOEg3LjI1Wk04LjA2OTMyIDcuMjE2NzZDNy42MzI4MyA3LjIzNDY3IDcuMjUgNy41OTAzOCA3LjI1IDguMDY4MThIOC43NUM4Ljc1IDguNDM1NTMgOC40NTY5MiA4LjcwMjEzIDguMTMwOCA4LjcxNTVMOC4wNjkzMiA3LjIxNjc2WiIgZmlsbD0id2hpdGUiLz48Y2lyY2xlIGN4PSI4IiBjeT0iMTIiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+`,
        title: '提示',
    },
    warning: {
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSI4IiBmaWxsPSIjQjM2NzFEIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDNDNy40NDc3MiAzIDcgMy40NDc3MiA3IDRWOEM3IDguNTUyMjggNy40NDc3MiA5IDggOUM4LjU1MjI4IDkgOSA4LjU1MjI4IDkgOFY0QzkgMy40NDc3MiA4LjU1MjI4IDMgOCAzWk04IDExQzcuNDQ3NzIgMTEgNyAxMS40NDc3IDcgMTJDNyAxMi41NTIzIDcuNDQ3NzIgMTMgOCAxM0M4LjU1MjI4IDEzIDkgMTIuNTUyMyA5IDEyQzkgMTEuNDQ3NyA4LjU1MjI4IDExIDggMTFaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
        title: '注意',
    },
    danger: {
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iOCIgZmlsbD0iI0FBMzUyRCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjUzMDMgNS41MzAzM0MxMS44MjMyIDUuMjM3NDQgMTEuODIzMiA0Ljc2MjU2IDExLjUzMDMgNC40Njk2N0MxMS4yMzc0IDQuMTc2NzggMTAuNzYyNiA0LjE3Njc4IDEwLjQ2OTcgNC40Njk2N0w4IDYuOTM5MzRMNS41MzAzMyA0LjQ2OTY3QzUuMjM3NDQgNC4xNzY3OCA0Ljc2MjU2IDQuMTc2NzggNC40Njk2NyA0LjQ2OTY3QzQuMTc2NzggNC43NjI1NiA0LjE3Njc4IDUuMjM3NDQgNC40Njk2NyA1LjUzMDMzTDYuOTM5MzQgOEw0LjQ2OTY3IDEwLjQ2OTdDNC4xNzY3OCAxMC43NjI2IDQuMTc2NzggMTEuMjM3NCA0LjQ2OTY3IDExLjUzMDNDNC43NjI1NiAxMS44MjMyIDUuMjM3NDQgMTEuODIzMiA1LjUzMDMzIDExLjUzMDNMOCA5LjA2MDY2TDEwLjQ2OTcgMTEuNTMwM0MxMC43NjI2IDExLjgyMzIgMTEuMjM3NCAxMS44MjMyIDExLjUzMDMgMTEuNTMwM0MxMS44MjMyIDExLjIzNzQgMTEuODIzMiAxMC43NjI2IDExLjUzMDMgMTAuNDY5N0w5LjA2MDY2IDhMMTEuNTMwMyA1LjUzMDMzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==',
        title: '警告',
    },
    details: {
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IiMwQTExMUEiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOCAzQzcuNDQ3NzIgMyA3IDMuNDQ3NzIgNyA0QzcgNC41NTIyOCA3LjQ0NzcyIDUgOCA1QzguNTUyMjggNSA5IDQuNTUyMjggOSA0QzkgMy40NDc3MiA4LjU1MjI4IDMgOCAzWk04IDdDNy40NDc3MiA3IDcgNy40NDc3MiA3IDhWMTJDNyAxMi41NTIzIDcuNDQ3NzIgMTMgOCAxM0M4LjU1MjI4IDEzIDkgMTIuNTUyMyA5IDEyVjhDOSA3LjQ0NzcyIDguNTUyMjggNyA4IDdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
        title: '说明',
    },
}
const syntaxHookConf = {
    beforeMakeHtml(str, sentenceMakeFunc, markdownParams) {
        let $str = str
        $str = $str.replace(this.RULE.reg, (match, leadingContent, lang, code) => {
            const [tipType, title] = lang?.trim().split(' ')
            if (tipsConf[tipType]) {
                const confItem = tipsConf[tipType]
                return `
                    <div class="colorful_tips colorful_tips_${tipType}">
                        <div class="colorful_tips_title">
                            <img src="${confItem.icon}"/>${title || confItem.title}
                        </div>
                        <div class="colorful_tips_cnt">${code}</div>
                    </div>
                `
            }
            return match
        })
        return $str
    },

    rule() {
        const ret = {
            /**
           * (?:^|\n)是区块的通用开头
           * (\n*)捕获区块前的所有换行
           * (?:[^\S\n]*)捕获```前置的空格字符
           */
            begin: /(?:^|\n)(\n*(?:[^\S\n]*)):::(.*?)\n/,
            content: /([\w\W\s]*?)/, // '([\\w\\W]*?)',
            end: /[^\S\n]*:::[ \t]*(?=$|\n+)/, // '\\s*```[ \\t]*(?=$|\\n+)',
        }
        ret.reg = new RegExp(ret.begin.source + ret.content.source + ret.end.source, 'g')
        return ret
    },
}

module.exports = {
    syntaxHookConf,

    createColorfulTipsPlugin(Cherry) {
        return Cherry.createSyntaxHook('colorfulTips', 'page', syntaxHookConf)
    },

    createColorfulMenuHook(Cherry, name) {
        return Cherry.createMenuHook(name, {
            subMenuConfig: [
                { name: 'tip', onclick: () => `\n::: tip 提示\n这是一个提示\n:::\n` },
                { name: 'warning', onclick: () => `\n::: warning 注意\n这是一个警告\n:::\n` },
                { name: 'danger', onclick: () => `\n::: danger 警告\n这是一个危险警告\n:::\n` },
                { name: 'details', onclick: () => `\n::: details 说明\n这是一个详情块\n:::\n` },
            ],
        })
    },
}