<template>
	<a-button type="primary" @click="showModal" style="margin-bottom: 30px;"
		><template #icon> <PlusSquareOutlined /></template>新增账单</a-button
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

	<a-button
		type="primary"
		style="margin-bottom: 30px;background-color: rgb(68, 173, 36);color: rgb(255, 255, 255);border: rgb(68, 173, 36);"
		><template #icon><ArrowUpOutlined /></template>上传账单</a-button
	>
	<a-table
		:columns="columns"
		:data-source="dataSource"
		:pagination="pagination"
		:loading="loading"
		@change="handleTableChange"
		bordered
	>
		<!-- 过滤框 -->
		<template
			#customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
		>
			<div style="padding: 8px">
				<a-input
					ref="searchInput"
					:placeholder="`Search ${column.dataIndex}`"
					:value="selectedKeys[0]"
					style="width: 188px; margin-bottom: 8px; display: block"
					@change="
						(e) =>
							setSelectedKeys(
								e.target.value ? [e.target.value] : []
							)
					"
					@pressEnter="
						handleSearch(selectedKeys, confirm, column.dataIndex)
					"
				/>
				<a-button
					type="primary"
					size="small"
					style="width: 90px; margin-right: 8px"
					@click="
						handleSearch(selectedKeys, confirm, column.dataIndex)
					"
				>
					<template #icon><SearchOutlined /></template>
					Search
				</a-button>
				<a-button
					size="small"
					style="width: 90px"
					@click="handleReset(clearFilters)"
				>
					Reset
				</a-button>
			</div>
		</template>
		<template #customFilterIcon="{ filtered }">
			<search-outlined
				:style="{ color: filtered ? '#108ee9' : undefined }"
			/>
		</template>
		<!-- 过滤框结束 -->
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
import { ref, computed, defineComponent, reactive, toRefs } from 'vue';
import { SelectBill, GetBillTypeList } from '../api/api.js';
import {
	SearchOutlined,
	ArrowUpOutlined,
	PlusSquareOutlined,
} from '@ant-design/icons-vue';

const state = reactive({
	searchText: '',
	searchedColumn: '',
});
const searchInput = ref();

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
		width: '20%',
		customFilterDropdown: true,
		onFilter: (value, record) =>
			record.billName
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => {
					searchInput.value.focus();
				}, 100);
			}
		},
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
const handleSearch = (selectedKeys, confirm, dataIndex) => {
	confirm();
	state.searchText = selectedKeys[0];
	state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters) => {
	clearFilters();
	state.searchText = '';
};
//查询数据
const queryData = (param) => {
	return SelectBill(param);
};

export default defineComponent({
	components: {
		ArrowUpOutlined,
		PlusSquareOutlined,
		SearchOutlined,
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
		//分页数据
		const pagination = computed(
			() => (
				console.log('执行了pagination'),
				{
					total: total.value,
					current: current.value,
					pageSize: pageSize.value,
				}
			)
		);
		//表格数据
		const dataSource = computed(() => data.value?.data.bill || []);
		//修改表单句柄
		const handleTableChange = (pag, filters, sorter) => {
			console.log('执行了handleTableChange');
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
			handleSearch,
			handleReset,
			searchInput,
			...toRefs(state),
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
