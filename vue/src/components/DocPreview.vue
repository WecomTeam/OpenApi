<template>
  <div class="docpreview">
    {{testString}}
  </div>
</template>

<script>
export default {
  name: 'DocPreview',
  props: ['apiData'],
  watch:{
    apiData(){
      this.testString = JSON.stringify(this.apiData)
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
  padding:15px;
  /* color:#f7f7f7; */

}
</style>
