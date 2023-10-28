import ProductTypesServices from "~/services/productTypesServices.js"

export const namespaced = true

export const state = () => {
	return {
		productTypes: [],
		error: {},
		totalProductTypes: 0,
	}
}

export const mutations = {
	setProductTypes(state, list) {
		state.productTypes = list
	},
	setError(state, error) {
		state.error = error
	},
	setTotalProductTypes(state, totalProductTypes) {
		state.totalProductTypes = totalProductTypes
	},
}
export const actions = {
	async fetchProductTypes({ commit }, params) {
		try {
			const response = await ProductTypesServices.getProductTypes(params)
			commit("setProductTypes", response.data.productTypes)
			commit("setTotalProductTypes", response.data.total)
			// eslint-disable-next-line no-console
			console.log("from productTypes store actions", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error })
			throw error
		}
	},
	async fetchAllProductTypes({ commit }) {
		try {
			const response = await ProductTypesServices.getAllProductTypes()
			commit("setProductTypes", response.data.productTypes)
			commit("setTotalProductTypes", response.data.total)
			// eslint-disable-next-line no-console
			console.log("from productTypes store actions", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error })
			throw error
		}
	},

	async addProductType({ commit }, productType) {
		try {
			const response = await ProductTypesServices.postProductType(productType)
			// eslint-disable-next-line no-console
			console.log("posting the new productTypes", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error.message })
			// eslint-disable-next-line no-console
			console.log("posting the new productTypes", error.message)
			return error.response
		}
	},
	async updateProductType({ commit }, productType) {
		try {
			const response = await ProductTypesServices.updateProductType(productType)
			// eslint-disable-next-line no-console
			console.log("updating the existsing productTypes", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error.message })
			// eslint-disable-next-line no-console
			console.log("updating the existsing productTypes", error.message)
			return error.response
		}
	},
	async deleteProductTypes({ commit }, productTypes) {
		try {
			const response = await ProductTypesServices.deleteProductTypes(productTypes)
			// eslint-disable-next-line no-console
			console.log("deleting the existsing productTypes", response)
			return { status: response.status }
		} catch (error) {
			commit("setError", { isError: true, errMsg: error.message })
			// eslint-disable-next-line no-console
			console.log("deleting the existsing productTypes", error.message)
			return error.response
		}
	},
}

export const getters = {
	getProductTypes(state) {
		return state.productTypes
	},
	getTotalProductTypes(state) {
		return state.totalProductTypes
	},
	getProductTypeCodes(state) {
		return state.productTypes.map((productTypes) => productTypes.productTypesRegionCode)
	},
}
