<template>
    <div class="mainbox">
        <div class="editorDoc">
            <DocEditVue 
                :apiSchema="apiData.schema"
                :defaultValue="api.is_check" 
                @mark="onMark"
            @save="onSave"/>                
        </div>
        <div class="previewDoc">
            <DocPreviewVue :apiMd="apiData.md"/>
        </div>
    </div>
</template>
  

  
<script>
import axios from 'axios';
import DocEditVue from './DocEdit.vue';
import DocPreviewVue from './DocPreview.vue';
export default {
    name: 'MainBox',
    components: {
        DocEditVue,
        DocPreviewVue
    },
    props: ['api'],
    watch: {
        api: {
            async handler(value) {
                if(value.api){
                    this.getOnlineDocURL()
                    let schema = await this.fetchApi(value.api);
                    if(schema){
                        this.apiData = schema
                    }         
                }
            },
            deep: true
        }
    },
    methods: {
        async fetchApi(api) {
            const res = await axios.post('/api/info/get', {
                operationid: api
            })
            if(res.status == 200){
                return res.data
            }
            else{
                return 
            }           
            
        },
        getOnlineDocURL :function(){            
            this.onlineDocURL = `https://open.work.weixin.qq.com/wwopen/common/readDocument/${this.api.doc_id}`
        },
        async saveApi(operationid, schema) {
            const { data } = await axios.post('/api/info/edit', {
                schema,
                operationid
            })
            this.apiData.md = data.md
            this.$message.success({content: '保存成功'})
        },
        async onSave(schema) {
            try {
                await this.saveApi(this.api.api, schema)
            } catch(e) {
                this.$message.error({content: '保存失败'})
            }
        },
        onMark(is_mark) {
            this.$emit('mark', {
                operationid: this.api.api,
                is_mark: is_mark
            })
        },
    },

    data() {
        return {
            tabValue:'preview',
            apiData:{
                md: {
                    domStr: '',
                    md: ''
                },
                schema: {}
            },      
            onlineDocURL:''
        };
    },
}
</script>
  

<style scoped lang="less">
.mainbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
}

.editorDoc {
    flex: 1;
    height: 100%;
    width: 50%;
}

.previewDoc {
    flex: 1;
    height: 100%;
    width: 50%;
}
</style>
  