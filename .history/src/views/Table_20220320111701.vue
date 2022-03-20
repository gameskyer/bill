<template>
	<div>
		<div class="table-operations">
			<a-button @click="setAgeSort">Sort age</a-button>
			<a-button @click="setJoe">Filter Joe</a-button>
			<a-button @click="clearFilters">Clear filters</a-button>
			<a-button @click="clearAll">Clear filters and sorters</a-button>
		</div>
		<a-table
			:columns="columns"
			:data-source="data"
			@change="handleChange"
		/>
	</div>
</template>
<script>
import { computed, defineComponent, ref } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
];
export default defineComponent({
	components: {
		HelloWorld,
	},
	setup() {
		const filteredInfo = ref();
		const sortedInfo = ref();
		const columns = computed(() => {
			const filtered = filteredInfo.value || {};
			const sorted = sortedInfo.value || {};
			return [
				{
					title: 'Name',
					dataIndex: 'name',
					key: 'name',
					filters: [
						{
							text: 'Joe',
							value: 'Joe',
						},
						{
							text: 'Jim',
							value: 'Jim',
						},
					],
					filteredValue: filtered.name || null,
					onFilter: (value, record) => record.name.includes(value),
					sorter: (a, b) => a.name.length - b.name.length,
					sortOrder: sorted.columnKey === 'name' && sorted.order,
					ellipsis: true,
				},
				{
					title: 'Age',
					dataIndex: 'age',
					key: 'age',
					sorter: (a, b) => a.age - b.age,
					sortOrder: sorted.columnKey === 'age' && sorted.order,
				},
				{
					title: 'Address',
					dataIndex: 'address',
					key: 'address',
					filters: [
						{
							text: 'London',
							value: 'London',
						},
						{
							text: 'New York',
							value: 'New York',
						},
					],
					filteredValue: filtered.address || null,
					onFilter: (value, record) => record.address.includes(value),
					sorter: (a, b) => a.address.length - b.address.length,
					sortOrder: sorted.columnKey === 'address' && sorted.order,
					ellipsis: true,
				},
			];
		});

		const handleChange = (pagination, filters, sorter) => {
			console.log('执行handleChange');
			console.log('Various parameters', pagination, filters, sorter);
			filteredInfo.value = filters;
			sortedInfo.value = sorter;
		};

		const clearFilters = () => {
			filteredInfo.value = null;
		};

		const clearAll = () => {
			filteredInfo.value = null;
			sortedInfo.value = null;
		};

		const setJoe = () => {
			filteredInfo.value = {
				name: ['Joe'],
			};
		};

		const setAgeSort = () => {
			sortedInfo.value = {
				order: 'descend',
				columnKey: 'age',
			};
		};

		return {
			data,
			columns,
			handleChange,
			clearFilters,
			clearAll,
			setAgeSort,
			setJoe,
		};
	},
});
</script>
<style scoped>
.table-operations {
	margin-bottom: 16px;
}

.table-operations > button {
	margin-right: 8px;
}
</style>
