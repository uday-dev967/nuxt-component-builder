import { mapActions, mapGetters } from "vuex"

export default {
	methods: {
		...mapActions("productTypes", ["fetchAllRecordsProductTypes"]),
		...mapGetters("productTypes", ["getProductTypes"]),
		async getAllProductTypesForAutoComplete() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsProductTypes, this.getProductTypes, helper)
			const updatedData = data.map((product) => {
				// eslint-disable-next-line no-console
				console.log("product", product)
				return {
					id: product._id,
					title: product.mainCategory,
					subTitle: product.subCategory,
					value: product.mainCategory,
				}
			})
			// eslint-disable-next-line no-console
			console.log("updated drop down data", updatedData)
			return updatedData
		},
	},
}
