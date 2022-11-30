<template>
    <div class="mainbox">
        <div class="editorDoc">
            <DocEditVue 
                :apiYaml="apiData.yaml"
                :operationid="api.api"
                :currentCheck="api.is_check" 
                @mark="onMark"
            @save="onSave"/>                
        </div>
        <div class="previewDoc">
            <DocPreviewVue :apiMd="apiData.md"/>
            <t-button class="open_btn" @click="onOpen">接口文档</t-button>
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
            async handler(value, pre) {
                if(value.api !== pre.api){
                    this.getOnlineDocURL()
                    let apiData = await this.fetchApi(value.api);
                    if(apiData){
                        this.apiData = apiData
                    }         
                }
            },
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
        async saveApi(operationid, yaml) {
            const { data } = await axios.post('/api/info/edit', {
                yaml,
                operationid
            })
            this.apiData.md = data.md
        },
        async onSave({yaml}) {
            try {
                await this.saveApi(this.api.api, yaml)
                // if(!isSilent) this.$message.success({content: '保存成功'})
            } catch(e) {
                // if(!isSilent) this.$message.error({content: '保存失败'})
                console.log(e)
            }
        },
        onMark(is_mark) {
            this.$emit('mark', {
                operationid: this.api.api,
                is_mark: is_mark
            })
        },
        onOpen() {
            window.open(this.onlineDocURL)
        }
    },

    data() {
        return {
            tabValue:'preview',
            apiData:{
                md: {
                    domStr: '',
                    md: ''
                },
                yaml: ''
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
.open_btn {
    position: absolute;
    right: 25px;
    top: 74px;
}
</style>
  