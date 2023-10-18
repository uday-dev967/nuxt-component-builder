<template>
	<v-form :ref="config.ref" @submit.prevent="submitForm">
		<v-container>
			<div v-for="(field, index) in config.fields" :key="index">
				<v-text-field
					v-if="field.type === 'text'"
					v-model="localFormData[field.ref]"
					:label="field.label"
					:placeholder="field.placeholder"
					:rules="getTextFieldRules(field)"
					:cols="field.col"
					inline
				></v-text-field>

				<v-text-field
					v-else-if="field.type === 'password'"
					v-model="localFormData[field.ref]"
					:label="field.label"
					:placeholder="field.placeholder"
					:append-icon="showPasswordIcon ? (showPassword ? 'mdi-eye' : 'mdi-eye-off') : ''"
					:type="showPassword ? 'text' : 'password'"
					:cols="field.col"
					inline
					@click:append="togglePasswordVisibility"
				></v-text-field>
				<v-checkbox
					v-else-if="field.type === 'checkbox'"
					v-model="localFormData[field.ref]"
					:label="field.label"
					:rules="getCheckboxRules(field)"
					:cols="field.col"
					inline
				></v-checkbox>

				<v-radio-group
					v-else-if="field.type === 'radio'"
					v-model="localFormData[field.ref]"
					:rules="getRadioRules(field)"
					:cols="field.col"
					inline
				>
					<v-radio
						v-for="(option, optionIndex) in field.options"
						:key="optionIndex"
						:label="option"
						:value="option"
					></v-radio>
				</v-radio-group>
				<v-select
					v-else-if="field.type === 'select'"
					v-model="localFormData[field.ref]"
					:items="field.options"
					:label="field.label"
					:rules="getSelectRules(field)"
					:cols="field.col"
					:inline-block="field.col < 12"
				></v-select>
			</div>
			<v-btn type="submit" color="primary">{{ config.button.action }}</v-btn>
		</v-container>
	</v-form>
</template>

<script>
export default {
	name: "FormBuilder",
	props: {
		config: {
			type: Object,
			required: true,
		},
		data: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			showPassword: false,
			showPasswordIcon: true,
			localFormData: this.data,
		}
	},
	methods: {
		togglePasswordVisibility() {
			this.showPassword = !this.showPassword
		},
		submitForm() {
			// const formRef = this.config.ref
			if (this.$refs[this.config.ref].validate()) {
				// Pass the form data to the parent component
				this.$emit("form-submitted", this.localFormData)
				// eslint-disable-next-line no-console
				console.log("form is valid", this.localFormData)
			} else {
				// eslint-disable-next-line no-console
				console.log("form is invalid")
			}
		},
		getTextFieldRules(field) {
			const rules = []
			if (field.required) {
				rules.push((value) => !!value || "This field is required")
			}
			// Add more rules as needed (e.g., min length, max length, regex validation)
			return rules
		},
		getPasswordFieldRules(field) {
			const rules = []
			if (field.required) {
				rules.push((value) => !!value || "This field is required")
			}
			// Add more rules as needed (e.g., min length, max length, regex validation)
			return rules
		},
		getCheckboxRules(field) {
			const rules = []
			if (field.required) {
				rules.push((value) => value === true || "You must agree to this")
			}
			return rules
		},
		getRadioRules(field) {
			const rules = []
			if (field.required) {
				rules.push((value) => !!value || "Please select an option")
			}
			return rules
		},
		getSelectRules(field) {
			const rules = []
			if (field.required) {
				rules.push((value) => !!value || "Please select an option")
			}
			return rules
		},
	},
}
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
