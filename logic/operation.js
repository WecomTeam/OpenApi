
const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml')
const parseValidFile = operationid => {
    return path.join(__dirname, `../../api/${operationid.replace(/[\.\/\\]/g, '')}.yaml`)
}

export const getApiSchema = async(operationid) => {
    try {
        const filePath = parseValidFile(operationid)
        const isExist = await fs.existsSync(filePath)
        if(isExist) {
            const yamlData = await fs.readFileSync(filePath)
            return {
                yaml: yamlData.toString(),
                schema: jsyaml.load(yamlData)
            }
        } else {
            return {}
        }
    } catch(e) {
        console.error(e)
        return {}
    }
}
export const editApiSchema = async(operationid, yamlData) => {
    try {
    const filePath = parseValidFile(operationid)
    const isExist = await fs.existsSync(filePath)
    if(isExist) {
        await fs.writeFileSync(filePath, yamlData)
    } else {
        // 不存在暂不处理
    }
    } catch(e) {
        console.error(e)
        return {}
    }
}