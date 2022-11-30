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
        <CategoryTree @onApiChanged="eventApiChanged" :tree="tree" :defaultValue="defaultApiName"/>
      </div>
      <div class="body">
        <router-view :api="currentApi" @mark="onMark">
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryTree from './components/catalog/CategoryTree.vue'
import axios from 'axios'

export default {
  name: 'App',
  data:function(){
    return {
      currentApi:{},
      defaultApiName: this.$route.params.operationid,
      tree: window._settings?.categoryTree || []
    }
  }, 
  components: {
    CategoryTree
  },
  async created() {
    const {data} = await axios.post('/api/category/get')
    this.tree = data
  },
  methods:{
    eventApiChanged(api){
      this.currentApi = api
    },
    insertMark(category, operationid, is_mark) {
      category.forEach(cate => {
        if(cate.is_folder) {
          this.insertMark(cate.children, operationid, is_mark)
        } else {
          if(cate.api === operationid) {
            cate.is_check = is_mark
          }
        }
      })
    },
    onMark({operationid, is_mark}) {
      this.insertMark(this.tree, operationid, is_mark)
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
