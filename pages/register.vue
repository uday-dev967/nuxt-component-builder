<template>
	<v-container class="mt-8">
		<v-row>
			<v-col cols="12" md="6">
				<h2>Register Form</h2>
				<dynamic-form :config="config" :data="formData" @form-submitted="register"></dynamic-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
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
						rules: ["required"],
						customRules: [
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
						customRules: [],
					},
					{
						type: "checkbox",
						label: "Subscribe to newsletter",
						key: "subscribe",
						col: 6,
						rules: ["required"],
						customRules: [],
					},
					{
						type: "radio",
						label: "Gender",
						options: ["Male", "Female"],
						key: "gender",
						col: 6,
						rules: ["required"],
						customRules: [],
					},
					{
						type: "select",
						label: "Country",
						options: ["IND", "USA", "Canada", "UK"],
						key: "country",
						col: 12,
						rules: ["required"],
						customRules: [],
					},
					{
						type: "date",
						label: "Birthdate",
						placeholder: "Select your birthdate",
						key: "birthdate",
						col: 12,
						rules: ["required"],
						customRules: [],
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
						customRules: [],
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
						customRules: [],
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
						customRules: [],
						multiple: true,
						multiPickerMenu: false,
					},
					{
						type: "combobox",
						label: "Favourite Cities",
						items: [
							{ id: 1, name: "mumbai" },
							{ id: 2, name: "hyderabad" },
							{ id: 3, name: "banglore" },
							{ id: 4, name: "kakinada" },
						],
						key: "favouriteCities",
						multiple: true,
					},
					{
						type: "combobox",
						label: "Favourite sports",
						items: [
							{ id: 1, name: "cricket" },
							{ id: 2, name: "football" },
							{ id: 3, name: "boxing" },
							{ id: 4, name: "basket ball" },
						],
						key: "favouriteSports",
						multiple: true,
					},
					{
						type: "autocomplete",
						label: "Favourite cars",
						items: [
							{ id: 1, name: "bmw" },
							{ id: 2, name: "audi" },
							{ id: 3, name: "mustang" },
							{ id: 4, name: "benz" },
						],
						key: "favouriteCars",
						multiple: true,
					},
					{
						type: "autocomplete",
						label: "Favourite food",
						items: [
							{ id: 1, name: "chiken" },
							{ id: 2, name: "mutton" },
							{ id: 3, name: "biriyani" },
							{ id: 4, name: "sweets" },
						],
						key: "favouritefoods",
					},
				],
			},
		}
	},
	methods: {
		login(formData) {
			// eslint-disable-next-line no-console
			console.log("Login form submitted with data:", formData)
			// Handle login logic here
		},
		register(formData) {
			// eslint-disable-next-line no-console
			console.log("Register form submitted with data:", formData)
			// Handle registration logic here
		},
	},
}
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
