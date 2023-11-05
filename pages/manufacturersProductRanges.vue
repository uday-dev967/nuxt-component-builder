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
import pipeSizesHelper from "~/mixins/pipeSizesHelper"
import countryHelper from "~/mixins/countryHelper"
export default {
	name: "ManufacturersProductRangesPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
		"snack-bar": SnackBar,
	},
	mixins: [firstLetterUpperCase, generalcrud, tableFormControls, dataFetchHelpers, pipeSizesHelper, countryHelper],
	data() {
		return {
			formConfig: null,
			tableConfig: {
				headers: [
					{ text: "Manufacturer Name", value: "manufacturerName" },
					{ text: "Country Code", value: "countryCode" },
					{ text: "Manufacturer Code", value: "manufacturerCode" },
					{ text: "Product Type-Main", value: "productTypeMain" },
					{ text: "Product Type-Sub", value: "productTypeSub" },
					{ text: "Range Name-Main", value: "rangeNameMain" },
					{ text: "Range Name-Sub", value: "rangeNameSub" },
					{ text: "Material Type", value: "materialTypeName" },
					{ text: "Connection Type", value: "connectionTypeName" },
					{ text: "Unit Type", value: "unitType" },
					{ text: "Pipe Sizes Available", value: "sizesText" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
	computed: {},
	created() {
		this.formConfig = {
			ref: "exampleTableForm",
			formCofiguredTo: "add",
			fields: [
				{
					type: "autocomplete",
					label: "Manufacturer Name",
					placeholder: "Manufacturer Name",
					configurationNeeded: true,
					refField: "sizes",
					disable: false,
					key: "manufacturerId",
					items: [
						// { id: 1, title: "uday", subTitle: "India", value: "uday" },
						// { id: 2, title: "uday", subTitle: "USA", value: "uday" },
						// { id: 3, title: "ram", subTitle: "USA", value: "ram" },
						// { id: 4, title: "cam", subTitle: "USA", value: "cam" },
					],
					rules: ["required"],
					getItems: () => this.getAllManufaturersForAutoComplete(),
					getDataOfRefField: (type) => this.populateSizes(type),
					dependency: async function (configObj, formdata) {
						const items = await this.getItems()
						// const updatedItems = items.map((item) => "")
						// eslint-disable-next-line no-console
						console.log("gettin items in dependency", items)
						const dependentObj = configObj.fields.find((field) => field.refField === this.key)
						// eslint-disable-next-line no-console
						console.log("forms", this.key, formdata[this.key], formdata)
						if (formdata[this.key]) {
							const manufacturer = items.find((item) => item.id === formdata[this.key])
							formdata[this.key] = manufacturer
							const type = manufacturer.unitType
							// eslint-disable-next-line no-console
							console.log("unit type", type, manufacturer)
							dependentObj.disable = false
							dependentObj.items = await this.getDataOfRefField(type)
						} else {
							dependentObj.disable = true
						}
						// eslint-disable-next-line no-console
						console.log("unit-type", dependentObj)
					},
				},
				{
					type: "autocomplete",
					label: "Pipe sizes available",
					placeholder: "Pipe sizes available",
					items: [],
					key: "sizes",
					rules: ["required"],
					refField: "manufacturerId",
					disable: false,
					multiple: true,
					dependency: function (configObj, formdata) {
						const dependentObj = configObj.fields.find((field) => field.refField === this.key)
						// eslint-disable-next-line no-console
						console.log(this.key, formdata[this.key], formdata)
						if (formdata[this.key] && formdata[this.key].length > 0) {
							// eslint-disable-next-line no-console
							console.log("unit type", "not null")
							dependentObj.disable = true
						} else {
							dependentObj.disable = false
						}
						// eslint-disable-next-line no-console
						console.log("unit type", dependentObj)
					},
				},
				{
					type: "autocomplete",
					label: "Connection Type",
					placeholder: "Connection Type",
					items: [],
					key: "connectionTpe",
					rules: ["required"],
				},
				{
					type: "text",
					label: "Range Name Main",
					placeholder: "Range Name Main",
					items: [],
					key: "rangeNameMain",
					rules: ["required"],
				},
				{
					type: "text",
					label: "Range Name Sub",
					placeholder: "Range Name Sub",
					items: [],
					key: "rangeNameSub",
					rules: ["required"],
				},
			],
		}
		this.initializeTableData({ page: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("manufacturerProductRanges", [
			"fetchTableData",
			"addTableData",
			"deleteTableData",
			"updateTableData",
		]),
		...mapGetters("manufacturerProductRanges", ["getManufacturerProductRanges"]),

		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			const helper = { configureTableData: this.configureTableData }
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
			this.initializeData(this.fetchTableData, this.getManufacturerProductRanges, params, helper)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
		async getAllManufaturersForAutoComplete() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsManufacturers, this.getManufacturers, helper)
			const updatedData = data.map((manufacturer) => {
				// eslint-disable-next-line no-console
				console.log("manufacturer", manufacturer)
				return {
					id: manufacturer._id,
					title: manufacturer.manufacturerName,
					value: manufacturer.manufacturerName,
					subTitle: manufacturer.country.countryRegionName,
					unitType: manufacturer.unitType,
				}
			})
			// eslint-disable-next-line no-console
			console.log("updated drop down data", updatedData)
			return updatedData
		},

		crudFormHelper(item) {
			// eslint-disable-next-line no-console
			console.log("from curd form helper", item)
			item.sizes = item.sizes.map((size) => {
				if (typeof size === "object") {
					return size.id
				}
				return size
			})
			return item
		},
		// crudFormHelper(item) {
		// 	item.compositeCode = `${item.manufacturerCode}_${item.countryCode.value}`
		// 	item.country = item.countryCode.id

		// 	return item
		// },
		configureTableData(data) {
			// eslint-disable-next-line no-console
			console.log("configureing", data)
			const updatedData = data.map((manufaturerProductRange) => {
				const rangeNameMain = manufaturerProductRange.rangeName.main
				const rangeNameSub = manufaturerProductRange.rangeName.sub
				const productTypeMain = manufaturerProductRange.productType.mainCategory
				const productTypeSub = manufaturerProductRange.productType.subCategory
				const materialTypeName = manufaturerProductRange.materialType.materialTypeName
				const connectionTypeName = manufaturerProductRange.connectionType.connectionTypeName
				const manufacturerName = manufaturerProductRange.manufacturer.manufacturerName
				const manufacturerId = manufaturerProductRange.manufacturer._id
				const manufacturerCode = manufaturerProductRange.manufacturer.manufacturerCode
				const unitType = manufaturerProductRange.manufacturer.unitType
				// const country = { id: manufaturerProductRange.country._id, value: manufaturerProductRange.country.countryRegionCode }
				const countryCode = this.fetchCountryById(
					manufaturerProductRange.manufacturer.country
				).countryRegionCode
				const { sizesText, sizes } = this.generatePizeSizesandSizesText(
					unitType,
					manufaturerProductRange.pipeSizesAvailable
				)
				// const sizesText = this.genterateSizesText(manufaturerProductRange)
				return {
					...manufaturerProductRange,
					manufacturerCode,
					unitType,
					rangeNameMain,
					rangeNameSub,
					productTypeMain,
					productTypeSub,
					materialTypeName,
					connectionTypeName,
					manufacturerName,
					countryCode,
					sizesText,
					sizes,
					manufacturerId,
				}
			})
			// eslint-disable-next-line no-console
			console.log("configured", updatedData)
			return updatedData
		},
	},
}
</script>
