import axios from 'axios';

export function SelectBill(params) {
	return axios({
		method: 'post',
		url: '/SelectBill',
		data: params,
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	});
}

export async function GetBillTypeList() {
	return await axios.get('/getBillTypeList');
}
export function GetBillStackedLine() {
	return axios({
		method: 'post',
		url: '/getBillStackedLine',
		headers: { 'Content-Type': 'application/json' },
	});
}
