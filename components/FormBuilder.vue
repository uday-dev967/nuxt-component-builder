<template>
	<v-form :ref="config.ref" @submit.prevent="submitForm">
		<v-container>
			<v-row justify="start" align="center">
				<v-col v-for="(field, index) in config.fields" :key="index" cols="6">
					<v-text-field
						v-if="field.type === 'text'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:value="field.value || 'hai'"
						:placeholder="field.placeholder"
						:type="field.type || 'text'"
						:rules="getTextFieldRules(field)"
						:cols="getColSize(field)"
						:disabled="field.disable || false"
						validate-on-blur
						@change="applyDependency(field)"
					></v-text-field>
					<v-text-field
						v-if="field.type === 'number'"
						v-model.number="localFormData[field.key]"
						:label="getLabel(field)"
						:placeholder="field.placeholder"
						:type="field.type || 'number'"
						:rules="getTextFieldRules(field)"
						:cols="getColSize(field)"
						:disabled="field.disable || false"
						validate-on-blur
						@change="applyDependency(field)"
					></v-text-field>
					<v-textarea
						v-if="field.type === 'textArea'"
						v-model.lazy="localFormData[field.key]"
						:label="getLabel(field)"
						:placeholder="field.placeholder"
						:rules="getTextFieldRules(field)"
						:cols="getColSize(field)"
						:disabled="field.disable || false"
						solo
						validate-on-blur
						name="input-7-4"
						@change="applyDependency(field)"
					></v-textarea>
					<v-text-field
						v-else-if="field.type === 'password'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:placeholder="field.placeholder"
						:append-icon="showPasswordIcon ? (showPassword ? 'mdi-eye' : 'mdi-eye-off') : ''"
						:type="showPassword ? 'text' : 'password'"
						:cols="getColSize(field)"
						:rules="getPasswordFieldRules(field)"
						:disabled="field.disable || false"
						validate-on-blur
						@change="applyDependency(field)"
						@click:append="togglePasswordVisibility"
					></v-text-field>
					<v-checkbox
						v-else-if="field.type === 'checkbox'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:rules="getCheckboxRules(field)"
						:cols="getColSize(field)"
						:disabled="field.disable || false"
						@change="applyDependency(field)"
					></v-checkbox>

					<v-radio-group
						v-else-if="field.type === 'radio'"
						v-model="localFormData[field.key]"
						:rules="getRadioRules(field)"
						:cols="getColSize(field)"
						:disabled="field.disable || false"
						@change="applyDependency(field)"
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
						:label="getLabel(field)"
						:rules="getSelectRules(field)"
						:cols="getColSize(field)"
						:disabled="field.disable || false"
						@change="applyDependency(field)"
					></v-select>
					<div v-else-if="field.type === 'date'">
						<label>{{ getLabel(field) }}</label>
						<v-date-picker
							v-model="localFormData[field.key]"
							:label="getLabel(field)"
							:placeholder="field.placeholder"
							:rules="getDateRules(field)"
							:min="field.min && field.min"
							:max="field.max && field.max"
							:cols="getColSize(field)"
							:multiple="field.multiple"
							:disabled="field.disable || false"
							@change="applyDependency(field)"
						></v-date-picker>
					</div>
					<div v-else-if="field.type === 'multipleDate'">
						<label>{{ getLabel(field) }}</label>
						<v-date-picker
							v-model="localFormData[field.key]"
							:label="getLabel(field)"
							:placeholder="field.placeholder"
							:rules="getDateRules(field)"
							:min="field.min && field.min"
							:max="field.max && field.max"
							:cols="getColSize(field)"
							:multiple="field.multiple"
							:disabled="field.disable || false"
							@change="applyDependency(field)"
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
					</div>
					<v-combobox
						v-else-if="field.type === 'combobox'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:items="field.items"
						:multiple="field.multiple"
						:rules="getComboboxRules(field)"
						:disabled="field.disable || false"
						item-text="value"
						item-value="id"
						@change="applyDependency(field)"
					>
					</v-combobox>
					<v-autocomplete
						v-else-if="field.type === 'autocomplete'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:items="field.items"
						:multiple="field.multiple"
						:rules="getAutoCompleteRules(field)"
						:disabled="field.disable || false"
						item-text="value"
						item-value="id"
						@change="applyDependency(field)"
					></v-autocomplete>
					<v-autocomplete
						v-else-if="field.type === 'asyncAutocomplete'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:items="asyncList[`asyncListKey${field.key}`]"
						:loading="field.isLoading"
						:cols="getColSize(field)"
						:rules="getAutoCompleteRules(field)"
						:disabled="field.disable || false"
						:color="field.loadingColor || 'green'"
						placeholder="Start typing to Search"
						prepend-icon="mdi-database-search"
						item-text="Description"
						item-value="API"
						return-object
						@change="applyDependency(field)"
						@update:search-input="search($event, field)"
					></v-autocomplete>
					<v-switch
						v-else-if="field.type === 'switch'"
						v-model="localFormData[field.key]"
						:label="getLabel(field)"
						:cols="getColSize(field)"
						:rules="getAutoCompleteRules(field)"
						:disabled="field.disable || false"
						:color="field.switchColor || 'green'"
						@change="applyDependency(field)"
					></v-switch>
				</v-col>
			</v-row>
			<template v-for="(button, index) in config.buttons">
				<v-btn v-if="button.type === 'submit'" :key="index" type="submit" color="primary">{{
					button.action
				}}</v-btn>
				<v-btn
					v-else-if="button.type === 'closeForm'"
					:key="index"
					color="primary"
					@click="closeForm(button)"
					>{{ button.action }}</v-btn
				>
			</template>
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
			default() {
				return {}
			},
		},
	},
	data() {
		return {
			col: 6,
			showPassword: false,
			showPasswordIcon: true,
			localFormData: JSON.parse(JSON.stringify(this.data)),
			requiredRule: (v) =>
				typeof v === "number" ? !!v ?? "This field is required" : !!v || "This field is required",
			emailRules: [(v) => /.+@.+\..+/.test(v) || "Email must be valid"],
			unitType: null,
			unitTypeOptions: ["Metric", "Imperial"],
			pipeSizes: [],
			pipeSizeOptions: [],
			unitTypeDisabled: false,
			pipeSizeDisabled: true,
			items: [],
			descriptionLimit: 60,
			entries: [],
			isLoading: false,
			model: null,
			asyncvalue: "",
			refsKeyList: {},
			asyncList: {},
		}
	},
	computed: {
		getPipeSizeOptions() {
			if (this.unitType === "Metric") {
				return ["1", "2", "4"]
			} else if (this.unitType === "Imperial") {
				return ["1/8", "1/4", "1/2"]
			}
			return []
		},
		handleUnitTypeDisable() {
			if (this.pipeSizes.length) return true
			return false
		},
		handlePipeSizeDisabled() {
			if (this.unitType === null) return true
			return false
		},
	},
	mounted() {
		// eslint-disable-next-line no-console
		console.log(this.data)
		this.config.fields.forEach((field) => {
			if (field.type === "asyncAuotcomplete") {
				this.asyncList[field.key] = field.items || []
				this.initalizeAsyncListKey(field)
				this.initalizeRefKey(field.key)
			}
		})
	},

	methods: {
		closeForm(button) {
			button.executeFunction()
			this.resetForm()
		},
		getLabel(field) {
			if (field.label) {
				return field.label
			} else if (field.type === "asyncAutocomplete") {
				return "Auto complete"
			} else if (field.type === "multiPleDate") return field.type
		},
		getColSize(field) {
			return field.col ? field.col : this.col
		},
		applyDependency(field) {
			if (field.dependency) {
				field.dependency(this.data)
			}
		},
		initalizeAsyncListKey(field) {
			const items = field.items || []
			this.$set(this.asyncList, `asyncListKey${field.key}`, items)
		},
		initalizeRefKey(key) {
			this.$set(this.refsKeyList, `refKey${key}`, null)
		},
		search(event, field) {
			// eslint-disable-next-line no-console
			console.log(event)
			// eslint-disable-next-line no-console
			console.log(this.refsKeyList[`refKey${field.key}`])
			if (event !== null) {
				if (this.refsKeyList[`refKey${field.key}`]) {
					clearTimeout(this.refsKeyList[`refKey${field.key}`])
					this.refsKeyList[`refKey${field.key}`] = null
				}
				this.refsKeyList[`refKey${field.key}`] = setTimeout(async () => {
					field.isLoading = true
					const apiData = await field.apiCall()
					if (apiData) {
						this.asyncList[`asyncListKey${field.key}`] = apiData
						field.isLoading = false
					}
				}, 500)
			}

			// eslint-disable-next-line no-console
		},
		togglePasswordVisibility() {
			this.showPassword = !this.showPassword
		},
		resetForm() {
			this.$refs[this.config.ref].reset()
		},
		submitForm() {
			if (this.$refs[this.config.ref].validate()) {
				this.$emit("form-submitted", this.localFormData)
				// eslint-disable-next-line no-console
				console.log("form is valid", this.localFormData)
				this.resetForm()
			} else {
				// eslint-disable-next-line no-console
				console.log("form is invalid")
			}
		},
		addCustomRequredRules(field) {
			const rules = []
			const customRules = field.rules ? field.rules.filter((rule) => typeof rule !== "string") : []
			customRules.length > 0 && rules.push(...customRules)
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
		handleUnitTypeChange() {
			this.pipeSizeDisabled = false
		},
		handlePipeSizeChange() {
			this.unitTypeDisabled = true
		},
	},
}
</script>

<style scoped>
/* Add your component-specific styling here */
</style>
