import { mapActions, mapGetters } from "vuex"

export default {
	methods: {
		...mapActions("masterPipe", ["fetchAllRecordsMasterPipes"]),
		...mapGetters("masterPipe", ["getPipeSizes"]),
		generatePizeSizesandSizesText(unitType, pipeSizes) {
			if (unitType === "inches") {
				const sizesText = pipeSizes.map((size) => size.imperialText).join(",")
				const sizes = pipeSizes.map((size) => ({ id: size._id, value: size.imperialText }))
				return { sizesText, sizes }
			} else {
				const sizesText = pipeSizes.map((size) => size.metricText).join(",")
				const sizes = pipeSizes.map((size) => ({ id: size._id, value: size.metricText }))
				return { sizesText, sizes }
			}
		},
		async populateSizes(type) {
			const helper = { params: { unit: type || "mm" } }
			const sizesData = await this.fetchData(this.fetchAllRecordsMasterPipes, this.getPipeSizes, helper)
			const updatedData = sizesData.map((data) => ({
				id: data._id,
				value: `${type === "mm" ? data.metricText : data.imperialText}`,
			}))
			// eslint-disable-next-line no-console
			console.log("populating sizes", updatedData)
			return updatedData
		},
	},
}
