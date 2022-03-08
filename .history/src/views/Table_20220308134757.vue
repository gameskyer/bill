<template>
<<<<<<< HEAD
  <a-table :data-source="data">
    <a-table-column-group>
      <template #title><span style="color: #1890ff">Name</span></template>
      <a-table-column key="firstName" data-index="firstName">
        <template #title><span style="color: #1890ff">First Name</span></template>
      </a-table-column>
      <a-table-column key="lastName" title="Last Name" data-index="lastName" />
    </a-table-column-group>
    <a-table-column key="age" title="Age" data-index="age" />
    <a-table-column key="address" title="Address" data-index="address" />
    <a-table-column key="tags" title="Tags" data-index="tags">
      <template #default="{ text: tags }">
        <span>
          <a-tag v-for="tag in tags" :key="tag" color="blue">{{ tag }}</a-tag>
        </span>
      </template>
    </a-table-column>
    <a-table-column key="action" title="Action">
      <template #default="{ record }">
        <span>
          <a>Action 一 {{ record.firstName }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
        </span>
      </template>
    </a-table-column>
  </a-table>
</template>
<script>
import { defineComponent } from 'vue';
const data = [{
  key: '1',
  firstName: 'John',
  lastName: 'Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  firstName: 'Jim',
  lastName: 'Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  firstName: 'Joe',
  lastName: 'Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
export default defineComponent({
  setup() {
    return {
      data,
    };
  },

});
</script>
=======
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
>>>>>>> cdb735954195b83c762a44d8522bcff5cd9318c8
