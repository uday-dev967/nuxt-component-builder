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
				subscribe: "",
				gender: "",
				country: "",
			},
			config: {
				ref: "registerFrom",
				button: { action: "register" },
				fields: [
					{
						type: "text",
						label: "Full Name",
						placeholder: "Enter your full name",
						ref: "fullName",
						col: 12,
						required: true,
					},
					{
						type: "text",
						label: "Email",
						placeholder: "Enter your email",
						ref: "email",
						col: 12,
						required: true,
					},
					{
						type: "password",
						label: "Password",
						placeholder: "Enter your password",
						ref: "password",
						col: 12,
						required: true,
					},
					{
						type: "checkbox",
						label: "Subscribe to newsletter",
						ref: "subscribe",
						col: 6,
						required: true,
					},
					{
						type: "radio",
						label: "Gender",
						options: ["Male", "Female"],
						ref: "gender",
						col: 6,
						required: true,
					},
					{
						type: "select",
						label: "Country",
						options: ["USA", "Canada", "UK"],
						ref: "country",
						col: 12,
						required: true,
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
