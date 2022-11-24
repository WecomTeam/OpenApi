<template>
<div class="cherry">
  <div v-html="apiMd.domStr" class="docpreview cherry-markdown">
    {{testString}}
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
.docpreview{
  padding:15px;
  /* color:#f7f7f7; */

}
</style>
