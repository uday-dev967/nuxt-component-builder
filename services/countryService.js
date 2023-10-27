import apiClient from "~/services/apiClient.js"

export default {
	getCountries(params = { page: 0, docsPerPage: 10 }) {
		// eslint-disable-next-line no-console
		console.log("apiClient params get countries", params)
		return apiClient.get(`/countries?pageNo=${params.page}&docsPerPage=${params.docsPerPage}`)
	},
	postCountry(country) {
		// eslint-disable-next-line no-console
		console.log("apiClient postting country", country)
		return apiClient.post("/countries", country)
	},
	updateCountry(country) {
		// eslint-disable-next-line no-console
		console.log("apiClient Updating country", country)
		return apiClient.patch("/countries", country)
	},
	deleteCountries(countryList) {
		// eslint-disable-next-line no-console
		console.log("apiClient deleting countries", countryList)
		return apiClient.delete("/countries", countryList)
	},
}
