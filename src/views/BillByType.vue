<template>
  <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading"
    @change="handleTableChange">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
    </template>
  </a-table>
</template>

<script>
import { usePagination } from 'vue-request';
import { computed, defineComponent } from 'vue';
import { SelectBillByType, GetBillTypeList } from '../api/api.js';
const arr = new Array()
//获取已有的类别
GetBillTypeList().then((res) => {
  res.data.forEach(element => {
    var obj = {
      text: element.billTypeName,
      value: element.billTypeName
    }
    arr.push(obj)
  });
})
const columns = [
  {
    title: '名称',
    dataIndex: 'billName',
    sorter: true,
    width: '20%',
  }, {
    title: '金额',
    dataIndex: 'billPrice',
    width: '30%'
  }, {
    title: '消费日期',
    dataIndex: 'billDate',
    width: '30%'
  }, {
    title: '类别',
    dataIndex: 'billType',
    filters: arr,
    width: '20%',
  }

];

const queryData = (param) => {
  return SelectBillByType(param);
};

export default defineComponent({
  setup () {
    /*
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: (res) =>
        res.data.bill,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
      },
    });
    */
    const {
      data: dataSource,
      run,
      loading,
      total,
      current,
      pageSize,
    }
      = usePagination(queryData, {
        formatResult: (res) => res.data.bill,
        defaultParams: [
          {
            total: 50,
          },
        ],
        pagination: {
          currentKey: 'page',
          pageSizeKey: 'results',
          totalKey: 'total'
        },

      });
    // const {

    //   total

    // }
    //   = usePagination(queryData, {
    //     formatResult: (res) => res.data,
    //     pagination: {
    //       currentKey: 'page',
    //       pageSizeKey: 'results',
    //       total: 'total'
    //     },
    //   });

    /*computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，
    然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；*/
    const pagination = computed(() => ({
      total: total.value,
      current: current.value,
      pageSize: pageSize.value,
    }));
    //这个应该是条件改变时执行的方法
    const handleTableChange = (pag, filters, sorter) => {
      run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };
    return {
      dataSource,
      pagination,
      total,
      loading,
      columns,
      handleTableChange,
    };
  },
  created () {


    // let param = new URLSearchParams();
    // param.append('type', this.$route.params.type);
    // const {
    //   data: dataSource,
    //   run,
    //   // current,
    //   // pageSize,
    // } = usePagination(queryData(param), {
    //   formatResult: (res) => res.data,
    //   pagination: {
    //     currentKey: 'page',
    //     pageSizeKey: 'data',
    //   },
    // });
    // /*
    // total:数据总数
    // current:当前页数
    // pageSize:当前页面显示数量
    // */
    // const pagination = computed(() => ({
    //   total: 900,
    //   // current: current.value,
    //   // pageSize: pageSize.value,
    //   current: 20,
    //   pageSize: 30,
    // }));

    // const handleTableChange = (pag, filters, sorter) => {
    //   run({
    //     results: pag.pageSize,
    //     page: pag?.current,
    //     sortField: sorter.field,
    //     sortOrder: sorter.order,
    //     ...filters,
    //   });
    // };

    // this.dataSource = dataSource
    // this.pagination = pagination
    // this.handleTableChange = handleTableChange
  }
})
</script>
