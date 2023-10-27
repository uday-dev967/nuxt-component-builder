import CountryService from "@/services/countryService.js"

export const namespaced = true

export const state = () => {
	return {
		countries: [],
		error: {},
		totalCountries: 0,
	}
}

export const mutations = {
	setCountries(state, list) {
		state.countries = list
	},
	setError(state, error) {
		state.error = error
	},
	setTotalCountries(state, totalCountries) {
		state.totalCountries = totalCountries
	},
}
export const actions = {
	async fetchCountries({ commit }, params) {
		try {
			const response = await CountryService.getCountries(params)
			commit("setCountries", response.data.countries)
			commit("setTotalCountries", response.data.total)
			// eslint-disable-next-line no-console
			console.log("from country store actions", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error })
			throw error
		}
	},
	async addCountry({ commit }, coutry) {
		try {
			const response = await CountryService.postCountry(coutry)
			// eslint-disable-next-line no-console
			console.log("posting the new country", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error.message })
			// eslint-disable-next-line no-console
			console.log("posting the new country", error.response)
			return error.response
		}
	},
	async updateCountry({ commit }, coutry) {
		try {
			const response = await CountryService.updateCountry(coutry)
			// eslint-disable-next-line no-console
			console.log("updating the existsing country", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error.message })
			// eslint-disable-next-line no-console
			console.log("updating the existsing country", error.response)
			return error.response
		}
	},
	async deleteCountry({ commit }, coutry) {
		try {
			const response = await CountryService.deleteCountry(coutry)
			// eslint-disable-next-line no-console
			console.log("deleting the existsing country", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error.message })
			// eslint-disable-next-line no-console
			console.log("deleting the existsing country", error.response)
			return error.response
		}
	},
}

export const getters = {
	getCountries(state) {
		return state.countries
	},
	getTotalCountries(state) {
		return state.totalCountries
	},
}
