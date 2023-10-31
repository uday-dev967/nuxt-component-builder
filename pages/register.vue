<template>
	<div class="mt-8">
		<h2>Register Form</h2>
		<dynamic-form :form-config="config" :data="formData" @form-submitted="register"></dynamic-form>
	</div>
</template>

<script>
import axios from "axios"
import { mapActions, mapGetters } from "vuex"
import DynamicForm from "~/components/FormBuilder.vue" // Adjust the path as needed

export default {
	name: "Register",
	components: {
		"dynamic-form": DynamicForm,
	},
	data() {
		return {
			formData: {
				fullName: "",
				email: "",
				password: "",
				subscribe: false,
				gender: "",
				country: "",
				birthdate: null,
				favoriteDates: [],
				vacationDates: [],
				unitType: { id: 1, value: "imperial" },
				pipeSizes: [{ id: 1, value: "1/8" }],
			},

			config: {
				ref: "registerFrom",
				button: { action: "register" },
				fields: [
					{
						type: "text",
						label: "Full Name",
						placeholder: "Enter your full name",
						key: "fullName",
						col: 12,
						rules: [
							"required",
							(v) => (v && v.length >= 4 && v.length <= 10) || "Text must be between 5 and 10 characters",
						],
					},
					{
						type: "text",
						label: "Email",
						placeholder: "Enter your email",
						key: "email",
						col: 12,
						rules: ["required", "isEmail"],
					},
					{
						type: "password",
						label: "Password",
						placeholder: "Enter your password",
						key: "password",
						col: 12,
						rules: ["required"],
					},
					{
						type: "checkbox",
						label: "Subscribe to newsletter",
						key: "subscribe",
						col: 6,
						rules: ["required"],
					},
					{
						type: "radio",
						label: "Gender",
						options: ["Male", "Female"],
						key: "gender",
						col: 6,
						rules: ["required"],
					},
					{
						type: "select",
						label: "Country",
						options: ["IND", "USA", "Canada", "UK"],
						key: "country",
						col: 12,
						rules: ["required"],
					},
					{
						type: "date",
						label: "Birthdate",
						placeholder: "Select your birthdate",
						key: "birthdate",
						col: 12,
						rules: ["required"],
						min: "1900-01-01",
						max: new Date().toISOString(),
						multiple: false,
					},
					{
						type: "date",
						label: "Startdate",
						placeholder: "Select your joining date",
						key: "startDate",
						rules: ["required"],
						min: "2023-10-01",
						max: "2023-10-30",
						multiple: false,
					},
					{
						type: "multipleDate",
						label: "Favorite Dates",
						placeholder: "Select your favorite dates",
						key: "favoriteDates",
						ref: "favoriteDates",
						col: 12,
						rules: [],
						multiple: true, // Enable multiple date selection
						multiPickerMenu: false,
					},
					{
						type: "multipleDate",
						label: "vaction Dates",
						placeholder: "Select your favorite dates",
						key: "vacationDates",
						ref: "vacationDates",
						col: 12,
						rules: [],
						multiple: true,
						multiPickerMenu: false,
					},
					{
						type: "combobox",
						label: "Favourite Cities",
						refField: "isFavouritesCitiesEnable",
						items: [
							{ id: 1, value: "mumbai" },
							{ id: 2, value: "hyderabad" },
							{ id: 3, value: "banglore" },
							{ id: 4, value: "kakinada" },
						],
						key: "favouriteCities",
						multiple: true,
					},
					{
						type: "switch",
						lable: "",
						switchColor: "orange",
						key: "isFavouritesCitiesEnable",
						refField: "favouriteCities",
						dependency: (configObj, formdata) => {
							this.dependencySwitchLock(configObj, formdata, "isFavouritesCitiesEnable")
						},
					},
					{
						type: "combobox",
						label: "Favourite sports",
						items: [
							{ id: 1, value: "cricket" },
							{ id: 2, value: "football" },
							{ id: 3, value: "boxing" },
							{ id: 4, value: "basket ball" },
						],
						key: "favouriteSports",
						refField: "isFavouriteSportsEnable",
						multiple: true,
					},
					{
						type: "switch",
						lable: "",
						key: "isFavouriteSportsEnable",
						refField: "favouriteCities",
						dependencyStatus: true,
						dependency: (configObj, formdata) => {
							this.dependencySwitchLock(configObj, formdata, "isFavouriteSportsEnable")
						},
					},
					{
						type: "autocomplete",
						label: "Favourite cars",
						items: [
							{ id: 1, value: "bmw" },
							{ id: 2, value: "audi" },
							{ id: 3, value: "mustang" },
							{ id: 4, value: "benz" },
						],
						key: "favouriteCars",
						multiple: true,
					},
					{
						type: "autocomplete",
						label: "Favourite food",
						items: [
							{ id: 1, value: "chiken" },
							{ id: 2, value: "mutton" },
							{ id: 3, value: "biriyani" },
							{ id: 4, value: "sweets" },
						],
						key: "favouritefoods",
					},
					{
						type: "asyncAutocomplete",
						label: "API Menu",
						items: [],
						url: "https://api.publicapis.org/entries",
						key: "apiMenu",
						isLoading: false,
						apiCall: async function () {
							try {
								const response = await axios.get(this.url)
								return response.data.entries
							} catch (error) {
								// eslint-disable-next-line no-console
								console.error(error)
							}
						},
					},
					{
						type: "asyncAutocomplete",
						label: "Fetch Menu",
						items: [],
						url: "https://api.publicapis.org/entries",
						key: "fetchMenu",
						isLoading: false,
						apiCall: async function () {
							try {
								const response = await axios.get(this.url)
								return response.data.entries
							} catch (error) {
								// eslint-disable-next-line no-console
								console.error(error)
							}
						},
					},
					{
						type: "combobox",
						label: "Identify By",
						items: [
							{ id: 1, value: "Country Name", getter: this.getCountryNames },
							{ id: 2, value: "Country Code", getter: this.getCountryCodes },
						],
						key: "identifyCountryBy",
						disable: false,
						refField: "countries",
						dependency: function (configObj, formdata) {
							const dependentObj = configObj.fields.find((field) => field.refField === this.key)
							// eslint-disable-next-line no-console
							console.log(this.key, formdata[this.key], formdata)
							dependentObj.items = []
							if (formdata[this.key]) {
								// eslint-disable-next-line no-console
								dependentObj.disable = false
								dependentObj.items = formdata[this.key].getter()
							} else {
								dependentObj.disable = true
							}
							// eslint-disable-next-line no-console
							console.log("identifyCountryBy outside", dependentObj)
						},
					},
					{
						type: "autocomplete",
						label: "Fetch Countries",
						items: [],
						getter: null,
						key: "countries",
						refField: "identifyCountryBy",
						isLoading: false,
						dependency: function (configObj, formdata) {
							// eslint-disable-next-line no-console
							console.log("pipe sizes", configObj)
							const dependentObj = configObj.fields.find((field) => field.refField === this.key)
							if (!formdata[this.key] || formdata[this.key]?.length === 0) {
								dependentObj.disable = false
							} else {
								dependentObj.disable = true
							}
						},
					},
					{
						type: "combobox",
						label: "unit type",
						items: [
							{ id: 1, value: "imperial" },
							{ id: 2, value: "metric" },
						],
						key: "unitType",
						disable: false,
						refField: "pipeSizes",
						dependency: function (configObj, formdata) {
							const dependentObj = configObj.fields.find((field) => field.refField === this.key)
							// eslint-disable-next-line no-console
							console.log(this.key, formdata[this.key], formdata)
							if (formdata[this.key] !== null) {
								// eslint-disable-next-line no-console
								console.log("unit type", "not null")
								dependentObj.disable = false
								dependentObj.items = dependentObj.itemsObj[formdata[this.key].value]
							}
							// eslint-disable-next-line no-console
							console.log("unit type", dependentObj)
						},
					},
					{
						type: "combobox",
						label: "pipe Sizes",
						items: [],
						itemsObj: {
							metric: [
								{ id: 1, value: "1" },
								{ id: 2, value: "2" },
								{ id: 3, value: "4" },
							],
							imperial: [
								{ id: 1, value: "1/8" },
								{ id: 2, value: "1/4" },
								{ id: 3, value: "1/2" },
							],
						},
						key: "pipeSizes",
						multiple: true,
						disable: true,
						refField: "unitType",
						dependencyStatus: true,
						dependency: function (configObj, formdata) {
							// eslint-disable-next-line no-console
							console.log("pipe sizes", configObj)
							const dependentObj = configObj.fields.find((field) => field.refField === this.key)
							if (formdata[this.key].length === 0) {
								dependentObj.disable = false
							} else {
								dependentObj.disable = true
							}
						},
					},
					{
						type: "textArea",
						label: "Comment",
						placeholder: "Speak your mind",
						key: "comment",
						rules: ["required", (v) => (v && v.length >= 20) || "Text must be atleast of 20 characters"],
					},
				],
			},
		}
	},
	mounted() {
		this.initializeData()
	},
	methods: {
		...mapActions("country", ["fetchAllRecords"]),
		...mapGetters("country", ["getCountryCodes", "getCountryNames"]),
		async initializeData() {
			const response = await this.fetchAllRecords()
			if (response.success) {
				// eslint-disable-next-line no-console
				console.log("initialized", response.totalEntries)
			} else {
				this.setSnackBar(response.message, "error")
			}
		},
		login(formData) {
			// eslint-disable-next-line no-console
			console.log("Login form submitted with data:", formData)
			// Handle login logic here
		},
		register(formData) {
			// eslint-disable-next-line no-console
			console.log("Register form submitted with data:", formData)
			const { pipeSizes } = formData
			const first = pipeSizes.find((each) => each.id === 1)
			// eslint-disable-next-line no-console
			console.log(first)
			// Handle registration logic here
		},
		dependencySwitchLock(configObj, formdata, key) {
			const dependentObj = configObj.fields.find((field) => field.refField === key)
			if (formdata[key]) {
				dependentObj.disable = true
			} else {
				dependentObj.disable = false
			}
		},
	},
}
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
