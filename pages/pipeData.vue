<template>
	<div>
		<h1>Pipe Data</h1>
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
import TableBuilder from "~/components/complexTableBuilder.vue"
import DynamicForm from "~/components/FormBuilder.vue"
import firstLetterUpperCase from "~/mixins/firstLetterUpperCase.js"
import generalcrud from "~/mixins/generalcrud.js"
import tableFormControls from "~/mixins/formControls.js"
import SnackBar from "~/components/SnackBar.vue"
import dataFetchHelpers from "~/mixins/dataFetchHelpers.js"
import pipeSizesHelper from "~/mixins/pipeSizesHelper.js"
import countryHelper from "~/mixins/countryHelper.js"
import manufacturerHelper from "~/mixins/manufaturerHelper.js"
import productTypeHelper from "~/mixins/productTypeHelper.js"
import connectionTypeHelper from "~/mixins/connectionTypeHelper"
import materialTypeHelper from "~/mixins/materialTypeHelper"
import configureHeadersHelper from "~/mixins/configuerHeadersHelper"
export default {
	name: "PipeDataPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
		"snack-bar": SnackBar,
	},
	mixins: [
		firstLetterUpperCase,
		generalcrud,
		tableFormControls,
		dataFetchHelpers,
		pipeSizesHelper,
		countryHelper,
		manufacturerHelper,
		productTypeHelper,
		connectionTypeHelper,
		materialTypeHelper,
		configureHeadersHelper,
	],
	data() {
		return {
			formConfig: {},
			tableConfig: null,
		}
	},
	computed: {},
	async created() {
		this.tableConfig = {
			tableData: [
				{
					"Test Description00": "value",
					"Test Description 2": "value",
					Dfgdfg: "Dfgdfg",
					Sdfsdg: "Sdfsdg",
					Hgfhgf: "Hgfhgf",
				},
			],
			getHeader: () =>
				this.configureTableHeaders(this.fetchAllRecordsCommonProductFields, this.getCommonProductFields),
			headers: [],
			totalEntries: 0,
		}
		this.tableConfig.headers = await this.tableConfig.getHeader()

		// eslint-disable-next-line no-console
		console.log("pip data table config", this.tableConfig)

		this.formConfig = {}
		// this.initializeTableData({ page: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("pipeData", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("pipeData", ["getPipeData"]),
		...mapActions("commonProductFields", ["fetchAllRecordsCommonProductFields"]),
		...mapGetters("commonProductFields", ["getCommonProductFields"]),
		// initializeTableData(params = { page: 0, docsPerPage: 10 }) {
		// 	const helper = { configureTableData: this.configureTableData }
		// 	// eslint-disable-next-line no-console
		// 	// console.log("response in the table", this.tableConfig.tableData)
		// 	this.initializeData(this.fetchTableData, this.getManufacturerProductRanges, params, helper)
		// 	// eslint-disable-next-line no-console
		// 	// console.log("response in the table", this.tableConfig.tableData)
		// },

		// crudFormHelper(item) {
		// 	// // eslint-disable-next-line no-console
		// 	// console.log("from curd form helper", item)

		// 	const pipeSizesAvailable = item.sizes.map((size) => {
		// 		if (typeof size === "object") {
		// 			return size.id
		// 		}
		// 		return size
		// 	})
		// 	const newItem = {
		// 		_id: item._id,
		// 		manufacturer: item.manufacturerId.id,
		// 		productType: item.productTypeId,
		// 		materialType: item.materialTypeId,
		// 		connectionType: item.connectionTypeId,
		// 		pipeSizesAvailable,
		// 		rangeName: { sub: item.rangeNameSub, main: item.rangeNameMain },
		// 	}
		// 	return newItem
		// },

		// configureTableData(data) {
		// 	// eslint-disable-next-line no-console
		// 	// console.log("configureing", data)
		// 	const updatedData = {}
		// 	return updatedData
		// },
	},
}
</script>
