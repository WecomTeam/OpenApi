import { category } from "@/components/catalog/CatalogData";
console.log(category)
let categoryTree = []

const makeTree = function (root) {
    let node_children = root.children
    let children = []
    if (node_children) {
        for (const key in node_children) {

            const node = node_children[key];
            children.push({
                title: node.title,
                doc_id: node.doc_id,
                cate_id: key,
                children
            })
        }
    }
    return children
}
categoryTree = makeTree(category)

export { categoryTree }