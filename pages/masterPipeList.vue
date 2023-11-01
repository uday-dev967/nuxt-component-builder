<template>
	<div>
		<h1>Master Pipe List</h1>
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
export default {
	name: "MasterPipeListPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
		"snack-bar": SnackBar,
	},
	mixins: [firstLetterUpperCase, generalcrud, tableFormControls],
	data() {
		return {
			formConfig: {
				ref: "exampleTableForm",
				formCofiguredTo: "add",
				fields: [
					{
						type: "text",
						label: "Imperial Display Text",
						placeholder: "Imperial Display Text",
						key: "imperialText",
						rules: ["required"],
					},
					{
						type: "text",
						label: "Metric Display Text",
						placeholder: "Metric Display Text",
						key: "metricText",
						rules: ["required"],
					},
					{
						type: "text",
						label: "DN Size",
						placeholder: "DN Size",
						key: "dnSize",
						rules: ["required"],
					},
					{
						type: "number",
						label: "Outer Diameter(Inches)",
						placeholder: "Outer Diameter(Inches)",
						key: "odInches",
						rules: ["required"],
						refField: "odMm",
						dependency: function (configObj, formdata) {
							if (formdata[this.key]) {
								formdata[this.refField] = Math.floor(Number(formdata[this.key]) * 25.4)
							} else {
								formdata[this.refField] = 0
							}
						},
					},
					{
						type: "text",
						label: "Outer Diameter(mm)",
						placeholder: "Outer Diameter(mm)",
						key: "odMm",
						rules: ["required"],
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Imperial Display Text", value: "imperialText" },
					{ text: "Metric Display Text", value: "metricText" },
					{ text: "DN Size", value: "dnSize" },
					{ text: "Outer Diameter(Inches)", value: "odInches" },
					{ text: "Outer Diameter(mm)", value: "odMm" },
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
		...mapActions("masterPipe", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("masterPipe", ["getMasterPipes"]),
		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			this.initializeData(this.fetchTableData, this.getMasterPipes, params)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
	},
}
</script>
