import { fetchData, deleteItems, fetchAllData, addItem, updateItem } from "./moduleHelper.js"
import ApiService from "@/services/countryService.js"

const mutationTypes = {
	setData: "setCountriesData",
	setTotal: "setTotalCountries",
}

const baseNames = {
	singular: "Country",
	prural: "Countries",
}

export const namespaced = true

export const state = () => {
	return {
		countriesData: {},
		totalCountries: 0,
	}
}

export const mutations = {
	setCountriesData(state, countiresData) {
		state.countriesData = countiresData
	},
	setTotalCountries(state, totalCountries) {
		state.totalCountries = totalCountries
	},
}
export const actions = {
	fetchCountries({ commit }, params) {
		return fetchData(commit, ApiService[`get${baseNames.prural}`], params, mutationTypes)
	},

	fetchAllCountries({ commit }) {
		return fetchAllData(commit, ApiService[`getAll${baseNames.prural}`], mutationTypes)

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

	addCountry({ commit }, country) {
		return addItem(ApiService[`post${baseNames.singular}`], country)
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
	updateCountry({ commit }, country) {
		return updateItem(ApiService[`update${baseNames.singular}`], country)
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
	deleteCountries({ commit }, countries) {
		return deleteItems(ApiService[`delete${baseNames.prural}`], countries)
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
		return state.countriesData.countries
	},
	getTotalCountries(state) {
		return state.totalCountries
	},
	getCountryCodes(state) {
		return state.countries.map((country) => country.countryRegionCode)
	},
}
