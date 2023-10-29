import { fetchData, deleteItems, fetchAllData, addItem, updateItem } from "./moduleHelper.js"
import ApiService from "~/services/productTypesServices.js"

const mutationTypes = {
	setData: "setProductTypesData",
	setTotal: "setTotalProductTypes",
}

const baseNames = {
	singular: "ProductType",
	prural: "ProductTypes",
}

export const namespaced = true

export const state = () => {
	return {
		productTypesData: {},
		error: {},
		totalProductTypes: 0,
	}
}

export const mutations = {
	setProductTypesData(state, data) {
		state.productTypesData = data
	},
	setTotalProductTypes(state, totalProductTypes) {
		state.totalProductTypes = totalProductTypes
	},
}

export const actions = {
	fetchProductTypes({ commit }, params) {
		return fetchData(commit, ApiService[`get${baseNames.prural}`], params, mutationTypes)
	},
	fetchAllProductTypes({ commit }) {
		return fetchAllData(commit, ApiService[`getAll${baseNames.prural}`], mutationTypes)
	},

	addProductType({ commit }, data) {
		return addItem(ApiService[`post${baseNames.singular}`], data)
	},
	updateProductType({ commit }, data) {
		return updateItem(ApiService[`update${baseNames.singular}`], data)
	},
	deleteProductTypes({ commit }, data) {
		return deleteItems(ApiService[`delete${baseNames.prural}`], data)
	},
}

export const getters = {
	getProductTypes(state) {
		// eslint-disable-next-line no-console
		console.log("from getter", state.productTypesData)
		return state.productTypesData.productTypes
	},
}
