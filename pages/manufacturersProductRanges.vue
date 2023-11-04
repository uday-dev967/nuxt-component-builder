<template>
	<div>
		<h1>Manufacturers Product Ranges</h1>
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
	name: "ManufacturersProductRangesPage",
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
						type: "autocomplete",
						label: "Manufacturer Name",
						placeholder: "Manufacturer Name",
						configurationNeeded: true,
						key: "manufacturerName",
						items: [
							{ id: 1, title: "uday", subTitle: "India", value: "uday" },
							{ id: 2, title: "uday", subTitle: "USA", value: "uday" },
							{ id: 3, title: "ram", subTitle: "USA", value: "ram" },
							{ id: 4, title: "cam", subTitle: "USA", value: "cam" },
						],
						rules: ["required"],
						getItems: async () => await this.getAllManufaturers(),
						dependency: async function (configObj, formdata) {
							this.items = await this.getItems()
						},
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Manufacturer Name", value: "manufacturerName" },
					{ text: "Country Code", value: "countryCode" },
					{ text: "Manufacturer Code", value: "manufacturerCode" },
					{ text: "Product Type-Main", value: "productTypeMain" },
					{ text: "Product Type-Sub", value: "productTypeSub" },
					{ text: "Range Name-Main", value: "rangeNameMain" },
					{ text: "Range Name-Sub", value: "rangeNameSub" },
					{ text: "Material Type", value: "materialType" },
					{ text: "Connection Type", value: "connectionType" },
					{ text: "Unit Type", value: "unitType" },
					{ text: "Pipe Sizes Available", value: "sizes" },
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
		...mapActions(" manufacturersProductRanges", [
			"fetchTableData",
			"addTableData",
			"deleteTableData",
			"updateTableData",
		]),
		...mapGetters("manufacturersProductRanges", ["getManufacturersProductRanges"]),
		...mapActions("manufacturer", ["fetchAllManfacturers"]),
		...mapGetters("manufacturer", ["getManfacturers"]),
		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			const helper = { configureTableData: this.configureTableData }
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
			this.initializeData(this.fetchTableData, this.getManufacturers, params, helper)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
		async getAllManufaturers() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsCountries, this.getCountries, helper)
			const updatedData = data.map((country) => ({ id: country._id, value: country.countryRegionCode }))
			return updatedData
		},
		crudFormHelper(item) {
			item.compositeCode = `${item.manufacturerCode}_${item.countryCode.value}`
			item.country = item.countryCode.id

			return item
		},
		configureTableData(data) {
			// eslint-disable-next-line no-console
			console.log("configureing", data)
			const updatedData = data.map((manufaturer) => {
				const countryCode = manufaturer.country.countryRegionCode
				const country = { id: manufaturer.country._id, value: manufaturer.country.countryRegionCode }
				return { ...manufaturer, countryCode, country }
			})
			// eslint-disable-next-line no-console
			console.log("configured", updatedData)
			return updatedData
		},
	},
}
</script>
