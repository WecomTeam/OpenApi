const parseValidFile = operationid => {
    return path.join(__dirname, `../../api/${operationid.replace(/[\.\/\\]/g, '')}.json`)
}

export const getApiSchema = async(operationid) => {
    const filePath = parseValidFile(operationid)
    const isExist = await fs.existsSync(filePath)
    if(isExist) {
        const jsonData = await require(filePath)
        return jsonData
    } else {
        return {}
    }
}

export const editApiSchema = async(operationid, schema) => {
    const filePath = parseValidFile(operationid)
    const isExist = await fs.existsSync(filePath)
    if(isExist) {
        await fs.writeFileSync(filePath, schema)
    } else {
        // 不存在暂不处理
    }
}