import { mapActions, mapGetters } from "vuex"
export default {
	methods: {
		...mapActions("country", ["fetchAllRecordsCountries"]),
		...mapGetters("country", ["getCountries"]),
		async getAllCountries() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsCountries, this.getCountries, helper)
			const updatedData = data.map((country) => ({ id: country._id, value: country.countryRegionCode }))
			return updatedData
		},
		getCountryById(id) {
			const allCountries = this.getCountries()

			const country = allCountries.find((country) => country._id === id)
			// eslint-disable-next-line no-console
			console.log("xxxxxxxxxxxxxxxxxx", country)
			return country
		},
	},
}
