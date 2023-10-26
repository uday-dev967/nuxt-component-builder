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
			return { ok: true }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error })
			throw error
		}
	},
	async addCountry({ commit }, coutry) {
		try {
			await CountryService.postCountry(coutry)
			return { ok: true }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error })
			throw error
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
