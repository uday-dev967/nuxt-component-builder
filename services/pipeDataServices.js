import servicesHelper from "~/services/servicesHelper"
const basePath = "/pipeData"
const baseName = "PipeData"
export default {
	[`get${baseName}`](params = { page: 0, docsPerPage: 10 }) {
		// eslint-disable-next-line no-console
		console.log("apiClient params get ", params)
		return servicesHelper.getData(basePath, params)
	},
	[`getAll${baseName}`](helper) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper get all ")
		return servicesHelper.getAllData(basePath, helper)
	},
	[`post${baseName}`](data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper postting ", data)
		return servicesHelper.postData(basePath, data)
	},
	[`update${baseName}`](data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper Updating ", data)
		return servicesHelper.updateData(basePath, data)
	},
	[`delete${baseName}`](data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper deleting countries", data)
		return servicesHelper.deleteData(basePath, { data })
	},
}