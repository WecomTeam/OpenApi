
const fs = require('fs');
const path = require('path');

const parseValidFile = operationid => {
    return path.join(__dirname, `../../api/${operationid.replace(/[\.\/\\]/g, '')}.json`)
}

export const getApiSchema = async(operationid) => {
    try {
        const filePath = parseValidFile(operationid)
        const isExist = await fs.existsSync(filePath)
        if(isExist) {
            const jsonData = await fs.readFileSync(filePath)
            return JSON.parse(jsonData)
        } else {
            return {}
        }
    } catch(e) {
        console.error(e)
        return {}
    }
}
export const editApiSchema = async(operationid, schema) => {
    try {
    const filePath = parseValidFile(operationid)
    const isExist = await fs.existsSync(filePath)
    if(isExist) {
        await fs.writeFileSync(filePath, JSON.stringify(schema))
    } else {
        // 不存在暂不处理
    }
    } catch(e) {
        console.error(e)
        return {}
    }
}