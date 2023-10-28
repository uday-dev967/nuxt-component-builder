import servicesHelper from "~/services/servicesHelper"
const basePath = "/countries"
export default {
	getCountries(params = { page: 0, docsPerPage: 10 }) {
		// eslint-disable-next-line no-console
		console.log("apiClient params get countries", params)
		return servicesHelper.getData(basePath, params)
	},
	getAllCountries() {
		// eslint-disable-next-line no-console
		console.log("servicesHelper get all countries")
		return servicesHelper.getAllData(basePath)
	},
	postCountry(data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper postting country", data)
		return servicesHelper.postData(basePath, data)
	},
	updateCountry(data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper Updating country", data)
		return servicesHelper.updateData(basePath, data)
	},
	deleteCountries(data) {
		// eslint-disable-next-line no-console
		console.log("servicesHelper deleting countries", data)
		return servicesHelper.deleteData(basePath, { data })
	},
}
