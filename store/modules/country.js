import { fetchData, deleteItems, fetchAllData, addItem, updateItem } from "./moduleHelper.js"
import ApiService from "@/services/countryService.js"

const mutationTypes = {
	setData: "setCountriesData",
	setTotal: "setTotalCountries",
	setCountry: "setCountry",
}

const baseName = "Countries"

export const namespaced = true

export const state = () => {
	return {
		countriesData: {},
		totalCountries: 0,
		country: [],
	}
}

export const mutations = {
	setCountriesData(state, countiresData) {
		state.countriesData = countiresData
	},
	setTotalCountries(state, totalCountries) {
		state.totalCountries = totalCountries
	},
	setCountry(state, data) {
		state.country = data
	},
}
export const actions = {
	fetchTableData({ commit }, params) {
		return fetchData(commit, ApiService[`get${baseName}`], params, mutationTypes)
	},

	fetchAllRecordsCountries({ commit }, helper) {
		return fetchAllData(commit, ApiService[`getAll${baseName}`], mutationTypes, helper)

		// try {
		// 	const response = await ApiService.getAllCountries()
		// 	commit("setCountries", response.data.countries)
		// 	commit("setTotalCountries", response.data.total)
		// 	// eslint-disable-next-line no-console
		// 	console.log("from country store actions", response)
		// 	return { success: true, message: "Data fetched successfully", totalEntries: response.data.total }
		// } catch (error) {
		// 	if (error.response.status === 400) {
		// 		return { success: false, message: error.response.data.message }
		// 	}
		// 	return { success: false, message: "OOPS! something went wrong" }
		// }
	},

	addTableData({ commit }, country) {
		return addItem(ApiService[`post${baseName}`], country)
		// try {
		// 	const response = await ApiService.postCountry(country)
		// 	// eslint-disable-next-line no-console
		// 	console.log("posting the new country", response)
		// 	return { success: true, message: "New Item is Added successfully" }
		// } catch (error) {
		// 	if (error.response.status === 400) {
		// 		return { success: false, message: error.response.data.message }
		// 	}
		// 	return { success: false, message: "OOPS! something went wrong" }
		// }
	},
	updateTableData({ commit }, country) {
		return updateItem(ApiService[`update${baseName}`], country)
		// try {
		// 	const response = await ApiService.updateCountry(country)
		// 	// eslint-disable-next-line no-console
		// 	console.log("updating the existsing country", response)
		// 	return { success: true, message: "Item Updated Successfully" }
		// } catch (error) {
		// 	if (error.response.status === 400) {
		// 		return { success: false, message: error.response.data.message }
		// 	}
		// 	return { success: false, message: "OOPS! something went wrong" }
		// }
	},
	deleteTableData({ commit }, countries) {
		return deleteItems(ApiService[`delete${baseName}`], countries)
		// try {
		// 	const response = await ApiService.deleteCountries(countries)
		// 	// eslint-disable-next-line no-console
		// 	console.log("deleting the existsing country", response)
		// 	return { success: true, message: "Item Deleted Successfully" }
		// } catch (error) {
		// 	if (error.response.status === 400) {
		// 		return { success: false, message: error.response.data.message }
		// 	}
		// 	return { success: false, message: "OOPS! something went wrong" }
		// }
	},
}

export const getters = {
	getCountries(state) {
		return state.countriesData.countriesData
	},
	getTotalCountries(state) {
		return state.totalCountries
	},
	getCountryCodes(state) {
		return state.countriesData.countriesData.map((country) => country.countryRegionCode)
	},
	getCountryNames(state) {
		return state.countriesData.countriesData.map((country) => country.countryRegionName)
	},
}
