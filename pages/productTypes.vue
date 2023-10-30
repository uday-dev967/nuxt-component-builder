<template>
	<div>
		<h1>Table Page Example</h1>
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
					:config="formConfig"
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
	name: "ProductTypesPage",
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
						label: "Master Category",
						placeholder: "Master Category",
						key: "masterCategory",
						rules: ["required"],
					},
					{
						type: "text",
						label: "Main Category",
						placeholder: "Main Category",
						key: "mainCategory",
						rules: ["required"],
					},
					{
						type: "text",
						label: "Sub Category",
						placeholder: "Sub Category",
						key: "subCategory",
						rules: ["required"],
					},
					{
						type: "textArea",
						label: "Note",
						placeholder: "ProductType",
						key: "notes",
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Master Category", value: "masterCategory" },
					{ text: "Main Category", value: "mainCategory" },
					{ text: "Sub Category", value: "subCategory" },
					{ text: "Note", value: "notes" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
	computed: {},
	created() {
		this.initializeTableData({ pageNo: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("productTypes", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("productTypes", ["getProductTypes", "getTotalProductTypes"]),
		initializeTableData(params = { pageNo: 0, docsPerPage: 10 }) {
			this.initializeData(this.fetchTableData, this.getProductTypes, params)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
	},
}
</script>
