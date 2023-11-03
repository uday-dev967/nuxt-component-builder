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
						type: "text",
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
						refField: "sizes",
						disable: false,
						getDataOfRefField: (type) => this.populateSizes(type),
						dependency: async function (configObj, formdata) {
							const dependentObj = configObj.fields.find((field) => field.refField === this.key)
							// eslint-disable-next-line no-console
							console.log(this.key, formdata[this.key], formdata)
							if (formdata[this.key]) {
								// eslint-disable-next-line no-console
								console.log("unit type", "not null")
								dependentObj.disable = false
								dependentObj.items = await this.getDataOfRefField(formdata[this.key])
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
						items: [],
						key: "sizes",
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
					{ text: "Unit Type", value: "unitType" },
					{ text: "Sizes", value: "sizesText", type: "array" },
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
					const sizesText = eachData.sizes.map((size) => size.imperialText).join(",")
					const sizes = eachData.sizes.map((size) => ({ id: size._id, value: size.imperialText }))
					return { ...eachData, sizesText, sizes }
				} else {
					const sizesText = eachData.sizes.map((size) => size.metricText).join(",")
					const sizes = eachData.sizes.map((size) => ({ id: size._id, value: size.metricText }))

					return { ...eachData, sizesText, sizes }
				}
			})
			return newData
		},

		async populateSizes(type) {
			const helper = { params: { unit: type || "mm" } }
			const sizesData = await this.fetchData(this.fetchAllRecordsMasterPipes, this.getPipeSizes, helper)
			const updatedData = sizesData.map((data) => ({
				id: data._id,
				value: `${type === "mm" ? data.metricText : data.imperialText}`,
			}))
			// eslint-disable-next-line no-console
			console.log("populating sizes", updatedData)
			return updatedData
		},
		crudFormHelper(item) {
			item.sizes = item.sizes.map((size) => size.id)
			return item
		},
		// configuerFormData(data) {
		// 	data.sizes = data.sizesObj
		// 	return data
		// },
	},
}
</script>
