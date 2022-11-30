<template>
<div class="category__wrapper">
<template
        v-for="subCate in cate.children"
    >
        <t-submenu
        v-if="subCate.is_folder"
        :key="subCate.category_id"
        :value="subCate.category_id"
        :title="subCate.title">
            <categoryItem @apiClick="eventApiClick" :key="subCate.category_id" :cate="subCate"></categoryItem>
        </t-submenu>
        <t-menu-item
            v-else
            :key="subCate.api"
            :value="subCate.api"
            @click="eventApiClick(subCate)">
            <span class="menu-api-item">{{ subCate.title }}<t-icon class="menu-api-item-checked" size="16px" name="check"  v-if="subCate.is_check"></t-icon></span>
        </t-menu-item>
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