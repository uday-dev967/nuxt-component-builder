import { fetchData, deleteItems, fetchAllData, addItem, updateItem } from "./moduleHelper.js"
import ApiService from "~/services/manufacturerServices.js"

const baseName = "Manufacturers"
const _baseName = "manufacturers"
const mutationTypes = {
	setData: `set${baseName}Data`,
	setTotal: `setTotal${baseName}`,
}

export const namespaced = true

export const state = () => {
	return {
		[`${_baseName}Data`]: {},
		error: {},
		[`total${baseName}`]: 0,
	}
}

export const mutations = {
	[mutationTypes.setData](state, data) {
		state[`${_baseName}Data`] = data
	},
	[mutationTypes.setTotal](state, total) {
		state[`total${baseName}`] = total
	},
}

export const actions = {
	fetchTableData({ commit }, params) {
		return fetchData(commit, ApiService[`get${baseName}`], params, mutationTypes)
	},
	[`fetchAllRecords${baseName}`]({ commit }, helper) {
		return fetchAllData(commit, ApiService[`getAll${baseName}`], mutationTypes, helper)
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
	fetchSizes({ commit }, params) {
		return fetchData(commit, ApiService[`get${baseName}`], params, mutationTypes)
	},
}

export const getters = {
	[`get${baseName}`](state) {
		// eslint-disable-next-line no-console
		console.log("from getter", state[`${_baseName}Data`])
		return state[`${_baseName}Data`][`${_baseName}Data`]
	},
	getPipeSizes(state) {
		return state[`${_baseName}Data`][`${_baseName}Data`]
	},
}
