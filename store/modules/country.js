import { fetchData, deleteItems, fetchAllData, addItem, updateItem } from "./moduleHelper.js"
import CountryService from "@/services/countryService.js"

const mutationTypes = {
	setData: "setCountries",
	setTotal: "setTotalCountries",
}

export const namespaced = true

export const state = () => {
	return {
		countries: [],
		totalCountries: 0,
	}
}

export const mutations = {
	setCountries(state, list) {
		state.countries = list
	},
	setTotalCountries(state, totalCountries) {
		state.totalCountries = totalCountries
	},
}
export const actions = {
	fetchCountries({ commit }, params) {
		return fetchData(commit, CountryService.getCountries, params, mutationTypes)
	},

	fetchAllCountries({ commit }) {
		return fetchAllData(commit, CountryService.getAllCountries, mutationTypes)

		// try {
		// 	const response = await CountryService.getAllCountries()
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
		return addItem(CountryService.postCountry, country)
		// try {
		// 	const response = await CountryService.postCountry(country)
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
		return updateItem(CountryService.updateCountry, country)
		// try {
		// 	const response = await CountryService.updateCountry(country)
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
		return deleteItems(CountryService.deleteCountries, countries)
		// try {
		// 	const response = await CountryService.deleteCountries(countries)
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
		return state.countries
	},
	getTotalCountries(state) {
		return state.totalCountries
	},
	getCountryCodes(state) {
		return state.countries.map((country) => country.countryRegionCode)
	},
}
