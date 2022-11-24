const colorfulTip = require('../lib/colorfulTips');
const { default: CherryEngine } = require('../lib/cherry-markdown.engine.core.js');

const TYPE_MAP = {
    '1': 'string',
    '2': 'array',
    '3': 'object',
    '4': 'number',
    '5': 'file',
};

const cherryEngineInstance = new CherryEngine({
    engine: {
        customSyntax: {
            ColorfulTips: {
                syntaxClass: colorfulTip.createColorfulTipsPlugin(CherryEngine),
                force: true,
                after: 'Paragraph',
            },
        },
    },
});

function cherryMakeHtml(md) {
    const htmlStr = cherryEngineInstance.makeHtml(md);

    
return htmlStr;
}

function walkSchema(schema = [], prefix = '') {
    let params = [];

    schema.forEach(property => {
        params.push({
            name: prefix + property.name,
            type: TYPE_MAP[property.type] || 'string', // 临时的type默认值
            desc: property.description || '无',
            required: property.is_required || false,
        });
        // 只有这两类type有items字段，如果没有则需要跳过
        if (property.items && TYPE_MAP[property.type] === 'object') {
            params = params.concat(walkSchema(property.items.properties, prefix + property.name + '.'));
        } else if (property.items && TYPE_MAP[property.type] === 'array') {
            // innerEle是数据内部元素，只有当其为对象和数组时才展示在字段示例中
            const innerEle = property.items.properties[0]?.items?.properties;

            if (innerEle) {
                params = params.concat(walkSchema(innerEle, prefix + property.name + '.'));
            }
        }
    });
    
return params;
}

function genApiMarkdownContent({
    apiInfo,
    apiSummary,
    doc_id,
    bodyExample,
    resExample,
}, auth, query, body, formData, response) {
    const getSupportType = (currentCompat) => {
        const supportMap = {
            '1': '×第三方应用',
            '2': '×自建应用',
            '3': '×代开发应用',
        };

        currentCompat.forEach((item) => {
            supportMap[item] = supportMap[item].replace('×', '✓');
        });
        
return `${supportMap[2]} ${supportMap[3]} ${supportMap[1]}`;
    };

    const hasRequestQuery = (auth.length + query.length) > 0;

    const hasRequestBody = body.length > 0;

    const hasFormData = formData.length > 0;

    const hasMarkAppType = apiInfo.compat_app.length > 0;

    const getRequiredText = isRequired => isRequired ? '是' : '否';

    const requestQueryMd = hasRequestQuery ? ('\n### 查询参数' +
    '\n|  参数 | 必须  | 类型  | 说明  |' +
    '\n| ------------ | ------------ | ------------ | ------------ |' +
    auth.map(item => `\n|${item.name}|${getRequiredText(item.required)}|${item.type}|${item.desc || ''}|`).join('') +
    query.map(item => `\n|${item.name}|${getRequiredText(item.required)}|${item.type}|${item.desc || ''}|`).join('')) : '';

    const requestBodyMd = hasRequestBody ? ('\n### 请求体' +
    '\n|  参数 | 必须  | 类型  | 说明  |' +
    '\n| ------------ | ------------ | ------------ | ------------ |' +
    body.map(item => `\n|${item.name}|${getRequiredText(item.required)}|${item.type}|${item.desc || ''}|`).join('') +
    '\n### 请求示例' +
    '\n```' +
    `\n${bodyExample}` +
    '\n```') : '';

    const formDataMd = hasFormData ? ('\n### 请求体' +
    '\n|  参数 | 必须  | 类型  | 说明  |' +
    '\n| ------------ | ------------ | ------------ | ------------ |' +
    formData.map(item => `\n|${item.name}|${getRequiredText(item.required)}|${[item.type]}|${item.desc || ''}|`).join('')) : '';

    const urlMd = doc_id ? `[${apiInfo.path}](https://developer.work.weixin.qq.com/interface/${doc_id}/${apiSummary.api_id})` : apiInfo.path;
    const permissionDesc = apiInfo.permission?.trim() ? `\n| 权限说明 | ${apiInfo.permission?.trim()}|` : '';
    const attention = apiInfo.attention ? `\n## 注意事项\n${apiInfo.attention}\n` : '';
    const markdown = apiInfo.description.trim() +
                     '\n## 请求\n### 基本信息' +
                     '\n| 条目 | 说明|' +
                     '\n| :------------ | :------------ |' +
                     `\n| URL  | ${urlMd} |` +
                     `\n| Method  | ${apiInfo.method}  |` +
                     (hasMarkAppType ? `\n| 应用类型 | ${getSupportType(apiInfo.compat_app)} |` : '') +
                     permissionDesc +
                     requestQueryMd +
                     requestBodyMd +
                     formDataMd +
                     '\n## 响应\n### 响应体' +
                     '\n| 参数 | 说明|' +
                     '\n| :------------ | :------------ |' +
                     response.map(item => `\n|${item.name}|${item.desc || ''}|`).join('') +
                     '\n### 响应示例' +
                     '\n```' +
                     `\n${resExample}` +
                     '\n```' +
                      attention;

    
return markdown;
}

function genExample(schema = [], isArray = false) {
    let example = {};

    schema.forEach(property => {
        let type = TYPE_MAP[property.type];

        if (!type) {
 type = 'string'; 
}
        if (type === 'file') {
            example[property.name] = '';
        } else if (type === 'string') {
            if (isArray) {
                example = property.example || '';
            } else {
                example[property.name] = property.example || '';
            }
        } else if (type === 'number') {
            if (isArray) {
                example = property.example || 0;
            } else {
                example[property.name] = property.example || 0;
            }
        } else if (property.items && type === 'object') {
            if (isArray) {
                example = genExample(property.items.properties) || {};
            } else {
                example[property.name] = genExample(property.items.properties);
            }
        } else if (property.items && type === 'array') {
            if (isArray) {
                example = genExample(property.items.properties, true) || [];
            } else {
                example[property.name] = [genExample(property.items.properties, true)];
            }
        }
    });
    
return example;
}

export const genWecomApiDoc = (apiJson, apiSummary, doc_id) => {

    const apiInfo = apiJson;

    if (!apiInfo) {
        return {};
    }

    // 格式化schema数据为表格参数
    const auth = walkSchema(apiInfo.request.auth);
    const query = walkSchema(apiInfo.request.params);
    const body = walkSchema(apiInfo.request.body);
    const bodyExample = genExample(apiInfo.request.body);
    const formData = walkSchema(apiInfo.request.form_data);
    const response = walkSchema(apiInfo.response[0].body);
    const resExample = genExample(apiInfo.response[0].body);
    const md = genApiMarkdownContent({
        apiInfo,
        apiSummary,
        doc_id,
        bodyExample: JSON.stringify(bodyExample, null, 2),
        resExample: JSON.stringify(resExample, null, 2),
    }, auth, query, body, formData, response);

    return { md, domStr: cherryMakeHtml(md) };
};