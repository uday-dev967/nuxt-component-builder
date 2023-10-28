import servicesHelper from "~/services/servicesHelper"
const basePath = "/productTypes"
export default {
	getProductTypes(params = { page: 0, docsPerPage: 10 }) {
		// eslint-disable-next-line no-console
		console.log("apiClient params get countries", params)
		return servicesHelper.getData(basePath, params)
	},
	getAllProductTypes() {
		// eslint-disable-next-line no-console
		console.log("servicesHelper get all countries")
		return servicesHelper.getAllData(basePath)
	},
	postProductTypes(data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper postting country", data)
		return servicesHelper.postData(basePath, data)
	},
	updateProductType(data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper Updating country", data)
		return servicesHelper.updateData(basePath, data)
	},
	deleteProductTypes(data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper deleting countries", data)
		return servicesHelper.deleteData(basePath, { data })
	},
}
