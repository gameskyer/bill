<template>
	<a-button type="primary" @click="showModal" style="margin-bottom: 30px;"
		><template #icon> <PlusSquareOutlined /></template>新增账单</a-button
	>
	<a-button
		type="primary"
		@click="showModal2"
		style="margin-bottom: 30px;background-color: rgb(68, 173, 36);color: rgb(255, 255, 255);border: rgb(68, 173, 36);"
		><template #icon><ArrowUpOutlined /></template>上传账单</a-button
	>

	<a-modal
		v-model:visible="visible"
		title="新增账单"
		:confirm-loading="confirmLoading"
		ok-text="提交"
		cancel-text="取消"
		@ok="handleOk"
	>
		<p>{{ modalText }}</p>
	</a-modal>
	<a-table
		:columns="columns"
		:data-source="dataSource"
		:pagination="pagination"
		:loading="loading"
		@change="handleTableChange"
		bordered
	>
		<template #bodyCell="{ column, text }">
			<template v-if="column.dataIndex === 'name'"
				>{{ text.first }} {{ text.last }}</template
			>
		</template>
	</a-table>
</template>
<style>
.ant-btn {
	margin-left: 10px;
	margin-right: 10px;
}
</style>
<script>
import { usePagination } from 'vue-request';
import { ref, computed, defineComponent } from 'vue';
import { SelectBill, GetBillTypeList } from '../api/api.js';
import { ArrowUpOutlined, PlusSquareOutlined } from '@ant-design/icons-vue';
const arr = new Array();
//获取已有的类别
GetBillTypeList().then((res) => {
	res.data.forEach((element) => {
		var obj = {
			text: element.billTypeName,
			value: element.billTypeName,
		};
		arr.push(obj);
	});
});
const columns = [
	{
		title: '名称',
		dataIndex: 'billName',
		sorter: true,
		width: '20%',
	},
	{
		title: '金额',
		dataIndex: 'billPrice',
		width: '30%',
	},
	{
		title: '消费日期',
		dataIndex: 'billDate',
		width: '30%',
	},
	{
		title: '类别',
		dataIndex: 'billType',
		filters: arr,
		width: '20%',
	},
];

const queryData = (param) => {
	return SelectBill(param);
};

export default defineComponent({
	components: {
		ArrowUpOutlined,
		PlusSquareOutlined,
	},
	setup() {
		//对话框
		const modalText = ref('Content of the modal');
		const visible = ref(false);
		const confirmLoading = ref(false);

		const showModal = () => {
			visible.value = true;
		};

		const handleOk = () => {
			modalText.value = 'The modal will be closed after two seconds';
			confirmLoading.value = true;
			setTimeout(() => {
				visible.value = false;
				confirmLoading.value = false;
			}, 2000);
		};
		//表格部分
		const {
			data,
			current,
			run,
			totalPage,
			loading,
			total,
			pageSize,
		} = usePagination(queryData, {
			pagination: {
				currentKey: 'page',
				pageSizeKey: 'results',
				totalKey: 'data.total',
			},
		});
		const pagination = computed(() => ({
			total: total.value,
			current: current.value,
			pageSize: pageSize.value,
		}));
		const dataSource = computed(() => data.value?.data.bill || []);
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
			loading,
			current,
			totalPage,
			pageSize,
			columns,
			pagination,
			handleTableChange,
			modalText,
			visible,
			confirmLoading,
			showModal,
			handleOk,
		};
	},
	created() {
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
	},
});
</script>
