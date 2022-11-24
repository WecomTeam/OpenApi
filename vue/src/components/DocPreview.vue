<template>
  <div class="docpreview">
    {{testString}}
  </div>
</template>

<script>
export default {
  name: 'DocPreview',
  props: ['apiSchema'],
  watch:{
    apiSchema(){
      this.testString = JSON.stringify(this.apiSchema)
    }
  },
  data(){
    return {
      testString:''
    }
  }
}
</script>


<style scoped>
.docpreview{
  padding:30px;
}
</style>
