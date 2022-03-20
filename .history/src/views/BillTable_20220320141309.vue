<template>
	<!-- <HelloWorld :msg="pageSize" /> -->
	<!-- 按钮部分 -->
	<a-button
		type="primary"
		style="margin-bottom: 30px;background-color: rgb(68, 173, 36);color: rgb(255, 255, 255);border: rgb(68, 173, 36);"
	>
		<template #icon> <ArrowUpOutlined /> </template>上传账单
	</a-button>
	<a-button type="primary">
		<router-link to="/billTable"
			><template #icon> <ArrowUpOutlined /> </template
			>清空查询</router-link
		>
	</a-button>
	<!-- 表格部分 -->
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
						//@pressEnter按下Enter
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
					<template #icon>
						<SearchOutlined />
					</template>
					搜索
				</a-button>
				<a-button
					size="small"
					style="width: 90px"
					@click="handleReset(clearFilters)"
				>
					清空
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
import { SearchOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
// import HelloWorld from '../components/HelloWorld.vue';
//reactive 是 Vue3 中提供的实现响应式数据的方法。reactive 参数必须是对象 (json / arr)
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
//表格部分
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
		sorter: true,
		width: '30%',
	},
	{
		title: '类别',
		dataIndex: 'billType',
		expandFixed: 'left',
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
	name: 'BillTable',
	//图标
	components: {
		ArrowUpOutlined,
		SearchOutlined,
		// HelloWorld,
	},
	setup() {
		//表格数据和分页部分
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
					pagination: false,
				}
			)
		);
		//表格数据
		const dataSource = computed(() => data.value?.data.bill || []);
		//修改表单句柄
		const handleTableChange = (pag, filters, sorter) => {
			console.log('执行了handleTableChange');
			console.log('Various parameters', pag, filters, sorter);

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
			handleSearch,
			handleReset,
			searchInput,
			...toRefs(state),
		};
	},
	created() {
		// console.log(this.$route.params.type);
		const type = this.$route.params.type;
		const billType = new Array();
		if (type != 'undefined' || type != '') {
			console.log('执行PUSH');
			console.log('TYPE:', type);
			billType.push(this.$route.params.type);
		}
		const pageSize = {
			billName: null,
			billType,
		};
		const page = this.pagination;
		this.handleTableChange(page, pageSize, {});
	},
});
</script>
