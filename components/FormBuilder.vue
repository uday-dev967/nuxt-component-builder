<template>
	<v-form :ref="config.ref" @submit.prevent="submitForm">
		<v-container>
			<div v-for="(field, index) in config.fields" :key="index">
				<v-text-field
					v-if="field.type === 'text'"
					v-model="localFormData[field.key]"
					:label="field.label"
					:placeholder="field.placeholder"
					:rules="getTextFieldRules(field)"
					:cols="field.col ? field.col : col"
					inline
				></v-text-field>

				<v-text-field
					v-else-if="field.type === 'password'"
					v-model="localFormData[field.key]"
					:label="field.label"
					:placeholder="field.placeholder"
					:append-icon="showPasswordIcon ? (showPassword ? 'mdi-eye' : 'mdi-eye-off') : ''"
					:type="showPassword ? 'text' : 'password'"
					:cols="field.col ? field.col : col"
					:rules="getPasswordFieldRules(field)"
					inline
					@click:append="togglePasswordVisibility"
				></v-text-field>
				<v-checkbox
					v-else-if="field.type === 'checkbox'"
					v-model="localFormData[field.key]"
					:label="field.label"
					:rules="getCheckboxRules(field)"
					:cols="field.col ? field.col : col"
					inline
				></v-checkbox>

				<v-radio-group
					v-else-if="field.type === 'radio'"
					v-model="localFormData[field.key]"
					:rules="getRadioRules(field)"
					:cols="field.col ? field.col : col"
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
					v-model="localFormData[field.key]"
					:items="field.options"
					:label="field.label"
					:rules="getSelectRules(field)"
					:cols="field.col ? field.col : col"
				></v-select>
				<v-date-picker
					v-else-if="field.type === 'date'"
					v-model="localFormData[field.key]"
					:label="field.label"
					:placeholder="field.placeholder"
					:rules="getDateRules(field)"
					:min="field.min && field.min"
					:max="field.max && field.max"
					:cols="field.col ? field.col : col"
					:multiple="field.multiple"
				></v-date-picker>
				<v-row v-else-if="field.type === 'multipleDate'">
					<v-date-picker
						v-model="localFormData[field.key]"
						:label="field.label"
						:placeholder="field.placeholder"
						:rules="getDateRules(field)"
						:min="field.min && field.min"
						:max="field.max && field.max"
						:cols="field.col ? field.col : col"
						:multiple="field.multiple"
					></v-date-picker>
					<v-menu
						:ref="field.ref ? field.ref : `${field.key}Multipicker`"
						v-model="field.multiDatePickerMenu"
						:close-on-content-click="false"
						:return-value.sync="localFormData[field.key]"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template #activator="{ on, attrs }">
							<v-combobox
								v-model="localFormData[field.key]"
								multiple
								chips
								small-chips
								:label="field.PickerLabel ? field.PickerLabel : `${field.key}Multipicker`"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-combobox>
						</template>
						<v-date-picker v-model="localFormData[field.key]" multiple no-title scrollable>
							<v-spacer></v-spacer>
							<v-btn text color="primary" @click="field.multiDatePickerMenu = false"> Cancel </v-btn>
							<v-btn
								text
								color="primary"
								@click="
									$refs[field.ref ? field.ref : `${field.key}Multipicker`][0].save(
										localFormData[field.key]
									)
								"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>
				</v-row>
				<v-combobox
					v-else-if="field.type === 'combobox'"
					v-model="localFormData[field.key]"
					:label="field.label ? field.label : `Select your ${field.key}`"
					:items="field.items"
					:multiple="field.multiple"
					:rules="getComboboxRules(field)"
					item-text="name"
					item-value="id"
				>
				</v-combobox>
				<v-autocomplete
					v-else-if="field.type === 'autocomplete'"
					v-model="localFormData[field.key]"
					:label="field.label ? field.label : `Select your ${field.key}`"
					:items="field.items"
					:multiple="field.multiple"
					:rules="getAutoCompleteRules(field)"
					item-text="name"
					item-value="id"
				></v-autocomplete>
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
			col: 12,
			showPassword: false,
			showPasswordIcon: true,
			localFormData: this.data,
			requiredRule: (v) => !!v || "This field is required",
			emailRules: [(v) => /.+@.+\..+/.test(v) || "Email must be valid"],
		}
	},
	mounted() {
		// eslint-disable-next-line no-console
		console.log(this.data)
	},
	methods: {
		togglePasswordVisibility() {
			this.showPassword = !this.showPassword
		},
		submitForm() {
			if (this.$refs[this.config.ref].validate()) {
				this.$emit("form-submitted", this.localFormData)
				// eslint-disable-next-line no-console
				console.log("form is valid", this.localFormData)
			} else {
				// eslint-disable-next-line no-console
				console.log("form is invalid")
			}
		},
		addCustomRequredRules(field, rules = []) {
			field.customRules?.length && rules.push(...field.customRules)
			return rules
		},
		getTextFieldRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push(this.requiredRule)
			field.rules?.includes("isEmail") && rules.push(...this.emailRules)
			return rules
		},
		getPasswordFieldRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push(this.requiredRule)
			return rules
		},
		getCheckboxRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push((value) => value === true || "You must agree to this")
			return rules
		},
		getRadioRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push((value) => !!value || "Please select an option")
			return rules
		},
		getSelectRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push((value) => !!value || "Please select an option")
			return rules
		},
		getDateRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push(this.requiredRule)
			// Add any other date-specific validation rules if needed
			return rules
		},
		getAutoCompleteRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push(this.requiredRule)
			// Add any other date-specific validation rules if needed
			return rules
		},
		getComboboxRules(field) {
			const rules = this.addCustomRequredRules(field)
			field.rules?.includes("required") && rules.push(this.requiredRule)
			// Add any other date-specific validation rules if needed
			return rules
		},
	},
}
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
