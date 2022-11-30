<template>
    <t-menu theme="dark" width="300px" :defaultValue="defaultValue">

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

                        <t-menu-item v-else :key="cata2.category_id" :value="cata2.api" @click="eventApiClick(cata2)"><span class="menu-api-item">{{ cata2.title }}<t-icon class="menu-api-item-checked" size="16px" name="check"  v-if="cata2.is_check"></t-icon></span></t-menu-item>

                    </template>

                </t-submenu>

                <t-menu-item v-else :key="cata1.category_id" :value="cata1.api" @click="eventApiClick(cata1)"><span class="menu-api-item">{{ cata1.title }}<t-icon class="menu-api-item-checked" name="check" size="16px"  v-if="cata1.is_check"></t-icon></span></t-menu-item>

            </template>

        </t-submenu>

    </t-menu>
</template>

<script>

export default {
    components: {
    
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
        eventApiClick:function(e){
            
            if(e.api != this.currentApi.api){
                
                this.currentApi = e
                this.$emit('onApiChanged',e)
            }
            
        },
        checkDoc(category) {
            category.forEach(cate => {
                if(cate.is_folder) {
                    this.checkDoc(cate.children)
                }
                if(cate.api === this.defaultValue) {
                    this.$emit('onApiChanged',cate)
                }
            })
        }
    }
}

</script>
<style scoped>
.menu-api-item{    
    position: relative;
    padding-left:20px
}
.menu-api-item-checked{
    width: 16px !important;;
    height: 16px !important;;
    position: absolute;
    left: 0px;
    top:50%;
    margin-top: -8px;
}
</style>