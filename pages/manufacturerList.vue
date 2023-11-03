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
import dataFetchHelpers from "~/mixins/dataFetchHelpers"
export default {
	name: "ManufacturerListPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
		"snack-bar": SnackBar,
	},
	mixins: [firstLetterUpperCase, generalcrud, tableFormControls, dataFetchHelpers],
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
						type: "combobox",
						label: "Country Code",
						placeholder: "Country Code",
						key: "countryCode",
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
		...mapActions("country", ["fetchAllRecordsCountries"]),
		...mapGetters("country", ["getCountries"]),
		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
			this.initializeData(this.fetchTableData, this.getManufacturers, params)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
		async getAllCountries() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsCountries, this.getCountries, helper)
			const updatedData = data.map((country) => ({ id: country._id, value: country.countryRegionCode }))
			return updatedData
		},
		crudFormHelper(item) {
			item.compositeCode = `${item.manufacturerCode}_${item.countryCode.value}`
			item.countryID = item.countryCode.id

			return item
		},
	},
}
</script>
