import { mapActions, mapGetters } from "vuex"

export default {
	methods: {
		...mapActions("materialTypes", ["fetchAllRecordsMaterialType"]),
		...mapGetters("materialTypes", ["getMaterialType"]),
		async getAllManufaturersForAutoComplete() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsMaterialType, this.getMaterialType, helper)
			const updatedData = data.map((material) => {
				// eslint-disable-next-line no-console
				console.log("material", material)
				return {
					id: material._id,
					title: material.materialTypeName,
					value: material.materialTypeCode,
				}
			})
			// eslint-disable-next-line no-console
			console.log("updated drop down data", updatedData)
			return updatedData
		},
	},
}
