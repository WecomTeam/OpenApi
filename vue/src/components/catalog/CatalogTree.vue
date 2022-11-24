<template>
    <t-menu theme="dark" width="300px">

        <t-submenu v-for="cata in tree" :key="cata.cate_id" :value="cata.category_id" :title="cata.title">
            <template #icon>
                <t-icon name="folder" />
            </template>

            <template v-for="cata1 in cata.children">
                <t-submenu v-if="cata1.is_folder" :key="cata1.category_id" :value="cata1.category_id"
                    :title="cata1.title">

                    <template v-for="cata2 in cata1.children">
                        <t-submenu v-if="cata2.is_folder" :key="cata2.category_id" :value="cata2.category_id"
                            :title="cata2.title">

                        </t-submenu>

                        <t-menu-item v-else :key="cata2.category_id" :value="cata2.api" @click="eventApiClick(cata2)">{{ cata2.title }}</t-menu-item>

                    </template>

                </t-submenu>

                <t-menu-item v-else :key="cata1.category_id" :value="cata1.api" @click="eventApiClick(cata1)">{{ cata1.title }}</t-menu-item>

            </template>

        </t-submenu>

    </t-menu>
</template>

<script>
import { categoryTree } from '@/components/catalog/CatalogParse';

console.log(categoryTree)
export default {
    data() {
        return {
            tree: categoryTree,
            currentApi:{}
        }
    },
    methods:{
        eventApiClick:function(e){
            console.log(e)
            if(e.api != this.currentApi.api){
                this.currentApi = e            
                this.$emit('onApiChanged',e.api)
            }
            
        }
    }
}

</script>