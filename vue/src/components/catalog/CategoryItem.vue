<template>
<div class="category__wrapper">
<template
        v-for="subCate in cate.children"
    >
        <t-submenu
        v-if="subCate.is_folder && subCate.children[0].is_folder"
        :key="subCate.category_id"
        :value="subCate.category_id"
        :title="subCate.title">
            <categoryItem @apiClick="eventApiClick" :key="subCate.category_id" :cate="subCate"></categoryItem>
        </t-submenu>
        <template v-else-if="subCate.is_folder && subCate.children.length > 1">
            <t-submenu
            :key="subCate.category_id"
            :value="subCate.category_id"
            :title="subCate.title">
                <t-menu-item
                    v-for="subSubCate in subCate.children"
                    :key="subSubCate.api"
                    :value="subSubCate.api"
                    @click="eventApiClick(subSubCate)">
                    <span class="menu-api-item">{{ subSubCate.title }}<t-icon class="menu-api-item-checked" size="16px" name="check"  v-if="subSubCate.is_check"></t-icon></span>
                </t-menu-item>
            </t-submenu>
        </template>
        <template v-else>
            <t-menu-item
                    v-for="subSubCate in subCate.children"
                    :key="subSubCate.api"
                    :value="subSubCate.api"
                    @click="eventApiClick(subSubCate)">
                    <span class="menu-api-item">{{ subSubCate.title }}<t-icon class="menu-api-item-checked" size="16px" name="check"  v-if="subSubCate.is_check"></t-icon></span>
                </t-menu-item>
        </template>
    </template>
</div>
    
</template>

<script>
export default {
    props: ['cate'],
    name: 'categoryItem',
    methods: {
        eventApiClick(e){
            this.$emit('apiClick',e)       
        }
    },
}
</script>

<style lang="less" scoped>
.menu-api-item{    
    position: relative;
    padding-left:20px
}
.menu-api-item-checked{
    width: 16px !important;
    height: 16px !important;
    position: absolute;
    left: 0px;
    top:50%;
    margin-top: -8px;
}
</style>