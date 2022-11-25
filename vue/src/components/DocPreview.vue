<template>
<div class="cherry">
  <div v-html="apiMd.domStr" class="cherry-markdown">
    无数据
  </div>
</div>
</template>

<script>
import '../style/cherry-markdown.css';
import '../style/cherry-wxwork.css';
import '../style/colorfulTips.css';
import '../style/style.css';

export default {
  name: 'DocPreview',
  props: ['apiMd'],
}
</script>


<style scoped>
.cherry{
  padding:25px;
  box-sizing: border-box;
  overflow-y:auto;
}
</style>
