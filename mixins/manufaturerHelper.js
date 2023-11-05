import { mapActions, mapGetters } from "vuex"

export default {
	methods: {
		...mapActions("manufacturer", ["fetchAllRecordsManufacturers"]),
		...mapGetters("manufacturer", ["getManufacturers"]),
	},
	async getAllManufaturersForAutoComplete() {
		const helper = { dropdown: "yes" }
		const data = await this.fetchData(this.fetchAllRecordsManufacturers, this.getManufacturers, helper)
		const updatedData = data.map((manufacturer) => {
			// eslint-disable-next-line no-console
			console.log("manufacturer", manufacturer)
			return {
				id: manufacturer._id,
				title: manufacturer.manufacturerName,
				value: manufacturer.manufacturerName,
				subTitle: manufacturer.country.countryRegionName,
				unitType: manufacturer.unitType,
			}
		})
		// eslint-disable-next-line no-console
		console.log("updated drop down data", updatedData)
		return updatedData
	},
}
