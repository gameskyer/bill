<template>
	<div>User {{ $route.params.type }}</div>
</template>
<script>
import { SelectBillByType } from '../api/api.js';
export default {
	created() {
		let param = new URLSearchParams();
		param.append('type', this.$route.params.type);
		SelectBillByType(param).then((res) => {
			console.log(res.data);
		});
	},
};
</script>
