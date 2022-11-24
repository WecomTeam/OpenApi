<template>
    <div class="mainbox">

        <div class="localdoc">
            <t-tabs :value="value2" theme="card" @change="(newValue) => (value2 = newValue)">
                <t-tab-panel value="first">
                    <template #label>
                        <t-icon name="file"></t-icon><span style="margin-left:5px;">预览</span>
                    </template>
                    <DocPreviewVue />
                </t-tab-panel>
                <t-tab-panel value="second">
                    <template #label>
                        <t-icon name="edit"></t-icon><span style="margin-left:5px;">编辑</span>
                    </template>
                    <DocEditVue />
                </t-tab-panel>
            </t-tabs>
        </div>
        <div class="onlinedoc">
            <iframe style="width:100%;height:100%;border:0 none;"
                src="https://open.work.weixin.qq.com/wwopen/common/readDocument/10019" frameborder="0"></iframe>
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
            if(value.api){
                this.apiSchema = await this.fetchApi()
            }
        }
    },
    methods: {
        async fetchApi() {
            const data = await axios.post('/api/info/get', {
                operationid: 'WwOpenGetUser'
            })
            console.log(data)
        }
    },

    data() {
        return {
            apiSchema:{},
            value1: 'first',
            value2: 'first',
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
}

.onlinedoc {
    flex: 1;
}

.t-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/deep/ .t-tabs__content {
    flex: 1;
    height: 1px;
    overflow-y: auto;
}
</style>
  