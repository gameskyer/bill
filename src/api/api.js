import axios from 'axios';

export function SelectBillByType(params) {
	return axios({
		method: 'post',
		url: '/SelectBillByType',
		data: params,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});
}

export async function GetBillTypeList() {
	return await axios.get('/getBillTypeList');
}
