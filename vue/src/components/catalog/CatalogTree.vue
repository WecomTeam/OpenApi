<template>
    <t-menu theme="dark">
        <t-submenu v-for="cate in tree" :key="cate.cate_id" :value="cate.cate_id" :title="cate.title">
            <template #icon>
                <t-icon name="folder" />
            </template>
            
            <t-menu-item value="1-1" disabled>
                <span>菜单二</span>
            </t-menu-item>
        </t-submenu>


        <t-submenu value="2" title="调度平台">
            <template #icon>
                <t-icon name="folder" />
            </template>
            <t-submenu value="2-1" title="二级菜单-1">
                <t-menu-item value="3-1">三级菜单-1</t-menu-item>
                <t-menu-item value="3-2">三级菜单-2</t-menu-item>
                <t-menu-item value="3-3">三级菜单-3</t-menu-item>
            </t-submenu>
            <t-menu-item value="2-2">
                <span>二级菜单-2</span>
            </t-menu-item>
        </t-submenu>
    </t-menu>
</template>

<script>
import { categoryTree } from '@/components/catalog/CatalogParse';

console.log(categoryTree)
export default {
    data() {
        return {
            tree: categoryTree
        }
    }
}

</script>