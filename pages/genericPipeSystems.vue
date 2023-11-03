<template>
	<div>
		<h1>Generic Pipe Systems</h1>
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
export default {
	name: "GenericPipeSystemsPage",
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
						label: "GPS Name",
						placeholder: "GPS Name",
						key: "name",
						rules: ["required"],
					},
					{
						type: "Code",
						label: "Code",
						placeholder: "Code",
						key: "code",
						rules: [
							"required",
							(v) => (v && v.length <= 8) || "Connection Type Code must be a maximum of 8 characters.",
						],
					},
					{
						type: "combobox",
						label: "Unit Type",
						placeholder: "Unit Type",
						items: ["inches", "mm"],
						key: "unitType",
						rules: ["required"],
						refField: "sizesObj",
						disable: false,
						getDataOfRefField: (type) => this.populateSizes(type),
						dependency: function (configObj, formdata) {
							const dependentObj = configObj.fields.find((field) => field.refField === this.key)
							// eslint-disable-next-line no-console
							console.log(this.key, formdata[this.key], formdata)
							if (formdata[this.key]) {
								// eslint-disable-next-line no-console
								console.log("unit type", "not null")
								dependentObj.disable = false
								dependentObj.items = this.getDataOfRefField(formdata[this.key])
							} else {
								dependentObj.disable = true
							}
							// eslint-disable-next-line no-console
							console.log("unit type", dependentObj)
						},
					},
					{
						type: "combobox",
						label: "Pipe sizes available",
						placeholder: "Pipe sizes available",
						items: [
							{ id: "653e83b0732928a997b50e08", value: "1/2" },
							{ id: 2, value: "1/3" },
							{ id: "653e8401732928a997b50e0b", value: "3/4" },
						],
						key: "sizesObj",

						rules: ["required"],
						refField: "unitType",
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
				],
			},
			tableConfig: {
				headers: [
					{ text: "GPS Name", value: "name" },
					{ text: "Code", value: "code" },
					{ text: "Sizes", value: "sizes", type: "array" },
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
		...mapActions("genericPipeSystems", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("genericPipeSystems", ["getGenericPipeSystems"]),
		...mapActions("masterPipe", ["fetchAllRecordsMasterPipes"]),
		...mapGetters("masterPipe", ["getPipeSizes"]),
		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			const helpers = { configureTableData: this.configureTableData }
			this.initializeData(this.fetchTableData, this.getGenericPipeSystems, params, helpers)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
		configureTableData(data) {
			const newData = data.map((eachData) => {
				if (eachData.unitType === "inches") {
					const sizes = eachData.sizes.map((size) => size.imperialText).join(",")
					const sizesObj = eachData.sizes.map((size) => ({ id: size._id, value: size.imperialText }))
					return { ...eachData, sizes, sizesObj }
				} else {
					const sizes = eachData.sizes.map((size) => size.metricText).join(",")
					const sizesObj = eachData.sizes.map((size) => ({ id: size._id, value: size.metricText }))

					return { ...eachData, sizes, sizesObj }
				}
			})
			return newData
		},

		populateSizes(type) {
			const helper = { params: { unit: type } }
			const data = this.fetchData(this.fetchAllRecordsMasterPipes, this.getPipeSizes, helper)
			// eslint-disable-next-line no-console
			console.log("populating sizes", data)
		},
		configuerFormData(data) {
			data.sizes = data.sizesObj
			return data
		},
	},
}
</script>
