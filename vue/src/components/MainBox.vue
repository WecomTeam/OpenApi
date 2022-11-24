<template>
    <div class="mainbox">

        <div class="localdoc">
            <div class="tabs-switch">
                <t-tabs theme="card" :value="tabValue"  @change="(newValue) => (tabValue = newValue)">
                <t-tab-panel value="preview">
                    <template #label>
                        <t-icon name="file"></t-icon><span style="margin-left:5px;">预览</span>
                    </template>
                    
                </t-tab-panel>
                <t-tab-panel value="edit">
                    <template #label>
                        <t-icon name="edit"></t-icon><span style="margin-left:5px;">编辑</span>

                    </template>
                    <DocEditVue :apiSchema="apiSchema" @save="onSave"/>
                    
                </t-tab-panel>
            </t-tabs>
            </div>
            <div class="tabs-content">
                <DocPreviewVue :hidden="tabValue != 'preview'" :apiData="apiData"/>
                <DocEditVue :hidden="tabValue != 'edit'" :apiSchema="apiData.schema" />
            </div>

            
        </div>
        <div class="onlinedoc">
            <iframe style="width:100%;height:100%;border:0 none;"
                :src="onlineDocURL" frameborder="0"></iframe>
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
        api:async function (value) {
            console.log(value)
            this.getOnlineDocURL()
            if(value.api){
                let schema = await this.fetchApi(value.api);
                if(schema){
                    this.apiData = schema
                }
            }
            
        }
    },
    methods: {
        async fetchApi(api) {
            const res = await axios.post('/api/info/get', {
                operationid: api
            })
            if(res.status == 200){
                console.log(res)
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
            await axios.post('/api/info/set', {
                schema,
                operationid
            })
            console.log('保存成功')
        },
        onSave(schema) {
            this.saveApi(this.api.operationid, schema)
        }
    },

    data() {
        return {
            tabValue:'preview',
            apiData:{},      
            onlineDocURL:''
        };
    },
}
</script>
  

<style scoped lang="less">
.mainbox {
    display: flex;
    height: 100%;
    width: 100%;
}

.localdoc {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.onlinedoc {
    flex: 1;
    flex-direction: column;
}

.tabs-switch {
    
}

.tabs-content {
    flex: 1;
    height: 1px;
    overflow-y: auto;
}
</style>
  