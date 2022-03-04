import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/Table.vue'),
  },
  {
    path: '/billByType/:type',
    name: 'BillByType',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/BillByType.vue'),
  },
  {
    path: '/billTable',
    name: 'BillTable',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/BillByType.vue'),
  },
  {
    path: '/bill',
    name: 'Bill',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/chart/Bill.vue'),
    // component: () => import(/* webpackChunkName: "about" */ '../echart.html')
  },
  {
    path: "/billLine",
    name: "billLine",
    component: () =>
      import("../views/chart/BillLine.vue")
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
