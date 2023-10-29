import servicesHelper from "~/services/servicesHelper"
const basePath = "/productTypes"
const baseNames = { singular: "ProductType", prural: "ProductTypes" }
export default {
	[`get${baseNames.prural}`](params = { page: 0, docsPerPage: 10 }) {
		// eslint-disable-next-line no-console
		console.log("apiClient params get ", params)
		return servicesHelper.getData(basePath, params)
	},
	[`getAll${baseNames.prural}`]() {
		// eslint-disable-next-line no-console
		console.log("servicesHelper get all ")
		return servicesHelper.getAllData(basePath)
	},
	[`post${baseNames.singular}`](data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper postting ", data)
		return servicesHelper.postData(basePath, data)
	},
	[`update${baseNames.singular}`](data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper Updating ", data)
		return servicesHelper.updateData(basePath, data)
	},
	[`delete${baseNames.prural}`](data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper deleting countries", data)
		return servicesHelper.deleteData(basePath, { data })
	},
}
