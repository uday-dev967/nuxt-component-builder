import apiClient from "~/services/apiClient.js"

export default {
	getData(path, params) {
		// eslint-disable-next-line no-console
		console.log("service helper getData", path, params)
		return apiClient.get(`${path}?pageNo=${params.page}&docsPerPage=${params.docsPerPage}`)
	},
	getAllData(path) {
		// eslint-disable-next-line no-console
		console.log("service helper getAllData", path)
		return apiClient.get(path)
	},
	postData(path, data) {
		// eslint-disable-next-line no-console
		console.log("service helper postData", path, data)
		return apiClient.post(path, data)
	},
	updateData(path, data) {
		// eslint-disable-next-line no-console
		console.log("service helper updateData", path, data)
		return apiClient.patch(`/countries/${data._id}`, data)
	},
	deleteData(path, data) {
		// eslint-disable-next-line no-console
		console.log("service helper deleteData", path, data)
		return apiClient.delete(path, data)
	},
}
