const getApiID = function (node) {
    let id
    let children = node.children
    let doc_id = node.doc_id

    if (children && doc_id) {
        id = Object.keys(children)[0]
    }
    return id
}

const parseNode = function (root) {

    if (root.doc_id == 0) {
        let tree = []
        for (const key in root.children) {
            const node = root.children[key];
            tree.push(parseNode(node))
        }
        return {
            is_folder:true,
            title: root.title,
            category_id: root.category_id,
            children: tree
        }
    }

    else {
        const keys = Object.keys(root.children)
        return {
            is_folder:true,
            title: root.title,
            category_id: root.category_id,
            doc_id:root.doc_id,
            children: keys.map(key => {
                return {
                    is_folder:false,
                    title: root.children[key],
                    api: key,
                    doc_id:root.doc_id,
                    category_id: root.category_id,
                }
            })
        }
    }
}

export const parseTree = parseNode