<template>
	<div>
		<h1>Manufacturer List</h1>
		<table-builder
			:table-config="tableConfig"
			:top-bar-config="topBarConfig"
			:pagination="pagination"
			:show-form="showForm"
			:actions="actions"
		>
			<template slot="addForm">
				<dynamic-form
					:key="formKey"
					:form-config="formConfig"
					:data="formData"
					@form-submitted="formSubmission"
				></dynamic-form>
			</template>
		</table-builder>
		<snack-bar ref="snackbar"></snack-bar>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import TableBuilder from "~/components/TableBuilder"
import DynamicForm from "~/components/FormBuilder.vue"
import firstLetterUpperCase from "~/mixins/firstLetterUpperCase.js"
import generalcrud from "~/mixins/generalcrud.js"
import tableFormControls from "~/mixins/formControls.js"
import SnackBar from "~/components/SnackBar.vue"
import dataFetchHelpers from "~/mixins/dataFetchHelpers.js"
import countryHelper from "~/mixins/countryHelper.js"

export default {
	name: "ManufacturerListPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
		"snack-bar": SnackBar,
	},
	mixins: [firstLetterUpperCase, generalcrud, tableFormControls, dataFetchHelpers, countryHelper],
	data() {
		return {
			formConfig: {
				ref: "exampleTableForm",
				formCofiguredTo: "add",
				fields: [
					{
						type: "text",
						label: "Manufacturer Name",
						placeholder: "Manufacturer Name",
						key: "manufacturerName",
						rules: ["required"],
					},
					{
						type: "autocomplete",
						label: "Country Code",
						placeholder: "Country Code",
						key: "country",
						rules: ["required"],
						items: [],
						getItems: async () => await this.getAllCountries(),
						dependency: async function (configObj, formdata) {
							this.items = await this.getItems()
						},
					},
					{
						type: "text",
						label: "Manufacturer Code",
						placeholder: "Manufacturer Code",
						key: "manufacturerCode",
						rules: ["required"],
					},
					{
						type: "combobox",
						label: "Unit Type",
						placeholder: "Unit Type",
						key: "unitType",
						items: ["mm", "inches"],
						rules: ["required"],
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Manufacturer Name", value: "manufacturerName" },
					{ text: "Country Code", value: "countryCode" },
					{ text: "Manufacturer Code", value: "manufacturerCode" },
					{ text: "Composite Code", value: "compositeCode" },
					{ text: "Unit Type", value: "unitType" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
	computed: {},
	created() {
		this.initializeTableData({ page: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("manufacturer", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("manufacturer", ["getManufacturers"]),

		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			const helper = { configureTableData: this.configureTableData }
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
			this.initializeData(this.fetchTableData, this.getManufacturers, params, helper)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},

		async crudFormHelper(item) {
			const options = await this.getAllCountries()
			if (typeof item.country === "object") {
				item.country = item.country.id
			}
			const countryCodeText = options.find((option) => option.id === item.country).value
			item.compositeCode = `${item.manufacturerCode}_${countryCodeText}`
			return item
		},
		configureTableData(data) {
			const updatedData = data.map((manufaturer) => {
				const countryCode = manufaturer.country.countryRegionCode
				const country = { id: manufaturer.country._id, value: manufaturer.country.countryRegionCode }
				return { ...manufaturer, countryCode, country }
			})
			return updatedData
		},
	},
}
</script>
