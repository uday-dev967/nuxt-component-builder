import { mapActions, mapGetters } from "vuex"

export default {
	methods: {
		...mapActions("materialTypes", ["fetchAllRecordsMaterialTypes"]),
		...mapGetters("materialTypes", ["getMaterialTypes"]),
		async getAllMaterialTypesForAutoComplete() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsMaterialTypes, this.getMaterialTypes, helper)
			const updatedData = data.map((material) => {
				// eslint-disable-next-line no-console
				console.log("material", material)
				return {
					id: material._id,
					title: material.materialTypeName,
					value: material.materialTypeName,
				}
			})
			// eslint-disable-next-line no-console
			console.log("updated drop down data", updatedData)
			return updatedData
		},
	},
}
