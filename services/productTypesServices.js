import apiClient from "~/services/apiClient.js"

export default {
	getProductTypes(params = { page: 0, docsPerPage: 10 }) {
		// eslint-disable-next-line no-console
		console.log("apiClient params get productTypes", params)
		return apiClient.get(`/productTypes?pageNo=${params.page}&docsPerPage=${params.docsPerPage}`)
	},
	getAllProductTypes() {
		// eslint-disable-next-line no-console
		console.log("apiClient get all productTypes")
		return apiClient.get("/productTypes")
	},
	postProductType(productType) {
		// eslint-disable-next-line no-console
		console.log("apiClient postting productType", productType)
		return apiClient.post("/productTypes", productType)
	},
	updateProductType(productType) {
		// eslint-disable-next-line no-console
		console.log("apiClient Updating productType", productType)
		return apiClient.patch(`/productTypes/${productType._id}`, productType)
	},
	deleteProductTypes(productTypeList) {
		// eslint-disable-next-line no-console
		console.log("apiClient deleting productTypes", productTypeList)
		return apiClient.delete("/productTypes", { data: productTypeList })
	},
}
