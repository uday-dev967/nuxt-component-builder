import { fetchData, deleteItems, fetchAllData, addItem, updateItem } from "./moduleHelper.js"
import ApiService from "~/services/productTypesServices.js"

const mutationTypes = {
	setData: "setProductTypesData",
	setTotal: "setTotalProductTypes",
}

const baseName = "ProductTypes"

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
	fetchTableData({ commit }, params) {
		return fetchData(commit, ApiService[`get${baseName}`], params, mutationTypes)
	},
	fetchAllRecords({ commit }) {
		return fetchAllData(commit, ApiService[`getAll${baseName}`], mutationTypes)
	},

	addTableData({ commit }, data) {
		return addItem(ApiService[`post${baseName}`], data)
	},
	updateTableData({ commit }, data) {
		return updateItem(ApiService[`update${baseName}`], data)
	},
	deleteTableData({ commit }, data) {
		return deleteItems(ApiService[`delete${baseName}`], data)
	},
}

export const getters = {
	getProductTypes(state) {
		// eslint-disable-next-line no-console
		console.log("from getter", state.productTypesData)
		return state.productTypesData.productTypes
	},
}
