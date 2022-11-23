<template>
    <div class="mainbox">

        <div class="localdoc">
        <t-tabs :value="value2" theme="card" @change="(newValue) => (value2 = newValue)">
            <t-tab-panel value="first" label="预览">
                <DocPreviewVue />
            </t-tab-panel>
            <t-tab-panel value="second" label="编辑">
                <DocEditVue />
            </t-tab-panel>            
        </t-tabs>
    </div>
    <div class="onlinedoc">
        <iframe style="width:100%;height:100%;border:0 none;" src="https://open.work.weixin.qq.com/wwopen/common/readDocument/10019" frameborder="0"></iframe>
    </div>

        
        
    </div>
</template>
  

  
<script>
import DocEditVue from './DocEdit.vue';
import DocPreviewVue from './DocPreview.vue';
export default {
    name: 'MainBox',
    components: {
        DocEditVue,
        DocPreviewVue
    },
    props: {

    },
    data() {
        return {
            value1: 'first',
            value2: 'first',
        };
    },
}
</script>
  

<style scoped>
.mainbox{
    display: flex;
    height:100%;
    width:100%;
}
.localdoc{
    flex: 1;
}
.onlinedoc{
    flex:1;
}
.t-tabs{
    display: flex;
    flex-direction: column;
    height:100%;
}
/deep/ .t-tabs__content{
    flex: 1;
    height: 1px;
    overflow-y: auto;
}
</style>
  