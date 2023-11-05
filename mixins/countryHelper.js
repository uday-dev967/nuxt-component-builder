import { mapActions, mapGetters } from "vuex"
export default {
	methods: {
		...mapActions("country", ["fetchAllRecordsCountries"]),
		...mapGetters("country", ["getCountries", "getCountryById"]),
		async getAllCountries() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsCountries, this.getCountries, helper)
			const updatedData = data.map((country) => ({ id: country._id, value: country.countryRegionCode }))
			return updatedData
		},
		async fetchCountryById(id) {
			await this.getAllCountries()
			const country = this.getCountryById(id)
			return country
		},
	},
}
