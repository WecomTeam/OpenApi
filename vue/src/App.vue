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
        <t-menu theme="dark">
          <t-menu-item value="0">
            <template #icon>
              <t-icon name="app" />
            </template>
            仪表盘
          </t-menu-item>

          <t-submenu value="1" title="资源列表">
            <template #icon>
              <t-icon name="code" />
            </template>
            <t-menu-item value="1-1" disabled>
              <span>菜单二</span>
            </t-menu-item>
          </t-submenu>
          <t-submenu value="2" title="调度平台">
            <template #icon>
              <t-icon name="file" />
            </template>
            <t-submenu value="2-1" title="二级菜单-1">
              <t-menu-item value="3-1">三级菜单-1</t-menu-item>
              <t-menu-item value="3-2">三级菜单-2</t-menu-item>
              <t-menu-item value="3-3">三级菜单-3</t-menu-item>
            </t-submenu>
            <t-menu-item value="2-2">
              <span>二级菜单-2</span>
            </t-menu-item>
          </t-submenu>
        </t-menu>
      </div>
      <div class="body">
        <MainBoxVue/>
      </div>
    </div>
  </div>
</template>

<script>
import MainBoxVue from './components/MainBox.vue';

export default {
  name: 'App',
  components: {
    MainBoxVue
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
  /* background-color: var(--td-gray-color-13); */
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
  overflow-y: auto;
}


</style>
