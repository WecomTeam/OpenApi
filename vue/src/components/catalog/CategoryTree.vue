<template>
    <t-menu theme="dark" width="300px" :defaultValue="defaultValue">
        <t-submenu v-for="cate in tree" :key="cate.cate_id" :value="cate.category_id" :title="cate.title">
            <template #icon>
                <t-icon name="folder" />
            </template>
            <CategoryItem @apiClick="onApiClick" :cate="cate"></CategoryItem>
        </t-submenu>
    </t-menu>
</template>

<script>
import CategoryItem from './CategoryItem.vue'
export default {
    components: {
        CategoryItem
    },
    props: {
        defaultValue: String,
        tree: Array
    },
    data() {
        return {
            currentApi:{}
        }
    },
    watch: {
        tree(val) {
            this.checkDoc(val)
        }
    },
    methods:{
        checkDoc(category) {
            category.forEach(cate => {
                if(cate.is_folder) {
                    this.checkDoc(cate.children)
                }
                if(cate.api === this.defaultValue) {
                    this.$emit('onApiChanged',cate)
                }
            })
        },
        onApiClick(e) {
            if(e.api != this.currentApi.api){
                
                this.currentApi = e
                this.$emit('onApiChanged',e)
            }
        }
    }
}

</script>
<style scoped>

</style>