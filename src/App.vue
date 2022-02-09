<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <router-link to="/bill">
            <pie-chart-outlined />
            <span>账单分类</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          <router-link to="/billTable">
            <table-outlined />
            <span>账单表格</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">
            <router-link to="/">Home</router-link>
          </a-menu-item>
          <a-menu-item key="5">Bill</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <!-- 二级菜单 -->
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <DingdingOutlined />
                <span>Team</span>
              </span>
            </template>
            <a-menu-item key="6">Team 1</a-menu-item>
            <a-menu-item key="7">Team 2</a-menu-item>
          </a-sub-menu>
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="8">Team 1</a-menu-item>
          <a-menu-item key="9">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="10">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 主页面 -->
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <!-- 面包屑 -->
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{
						padding: '24px',
						background: '#fff',
						minHeight: '900px',
					}">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  PieChartOutlined,
  TableOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  DingdingOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    PieChartOutlined,
    TableOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    DingdingOutlined,
  },

  data () {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },
});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
