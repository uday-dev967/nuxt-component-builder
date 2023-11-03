import qs from "query-string"
import apiClient from "~/services/apiClient.js"

export default {
	getData(path, params) {
		// eslint-disable-next-line no-console
		console.log("service helper getData", path, params)
		const updatedParams = { ...params, pageNo: params.page, page: undefined }
		const queryString = qs.stringify(updatedParams, { arrayFormat: "bracket" })
		// return apiClient.get(`${path}?pageNo=${params.page}&docsPerPage=${params.docsPerPage}`)
		return apiClient.get(`${path}?${queryString}`)
	},
	getAllData(path, helper) {
		let queryString
		if (helper.params) {
			queryString = qs.stringify(helper.params, { arrayFormat: "bracket" })
		}
		// eslint-disable-next-line no-console
		console.log("service helper getAllData", path)
		return apiClient.get(`${path}?${queryString}`)
	},
	postData(path, data) {
		// eslint-disable-next-line no-console
		console.log("service helper postData", path, data)
		return apiClient.post(path, data)
	},
	updateData(path, data) {
		// eslint-disable-next-line no-console
		console.log("service helper updateData", path, data)
		return apiClient.patch(`${path}/${data._id}`, data)
	},
	deleteData(path, data) {
		// eslint-disable-next-line no-console
		console.log("service helper deleteData", path, data)
		return apiClient.delete(path, data)
	},
}
