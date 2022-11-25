<template>

  <div class="frame">
    <div class="nav">
      <t-head-menu theme="dark">
        <template #logo>
          <img style="padding-left:30px;"
            src="https://wwcdn.weixin.qq.com/node/wework/images/202201062104.366e5ee28e.png" width="136" />
        </template>
        <template #operations>
          <a href="javascript:;">
            <t-icon class="t-menu__operations-icon" name="logo-github-filled" />
          </a>

        </template>
      </t-head-menu>
    </div>
    <div class="main">
      <div class="siderbar">
        <CatalogTree @onApiChanged="eventApiChanged" :defaultValue="defaultApiName"/>
      </div>
      <div class="body">
        <router-view :api="currentApi">
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogTree from './components/catalog/CatalogTree.vue'
import axios from 'axios'
export default {
  name: 'App',
  data:function(){
    return {
      currentApi:{},
      defaultApiName: this.$route.params.operationid
    }
  }, 
  async created(){    
    let treeRes = await axios.get('/api/category/gettree')
    console.log(treeRes.data)
  }, 
  components: {
    CatalogTree
  },
  methods:{
    eventApiChanged:function(api){
      this.currentApi = api
    }
  }
}
</script>

<style>
html{
  height:100%;
}
body {
  padding: 0;
  margin: 0;
  height: 100%;
  /* overflow-y:hidden; */
  /* background-color: var(--td-gray-color-14); */
}

.frame {
  display: flex;
  flex-direction: column;
  height:100%;
}
.nav{

}
.main{
  flex: 1;
  display: flex;
  height:1px;
}

.sidebar{
  height: 100%;
}
.body{
  flex:1;
  width:1px;
  height:100%;
  overflow-y: hidden;
}


</style>
