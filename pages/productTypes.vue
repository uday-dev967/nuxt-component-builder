<template>
	<div>
		<h1>Table Page Example</h1>
		<table-builder :table-config="tableConfig" :show-form="showForm">
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
				buttons: [
					{ type: "submit", action: "add", color: "primary" },
					{
						type: "closeForm",
						action: "close",
						executeFunction: () => {
							this.closeForm()
						},
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
				topBarConfig: {
					fields: [
						{
							type: "combobox",
							disable: false,
							label: "Show",
							fieldType: "number",
							key: "itemsPerPage",
							items: [5, 10, 20],
							relatedTo: "pagination",
							executeFunction: (val) => {
								this.changeItemsPerPage(val)
							},
						},
						{ type: "text", disable: false, placeHolder: "", label: "search", key: "searchInput" },
						{ type: "spacer", col: 5 },
						{
							type: "button",
							color: "primary",
							disable: true,
							icon: "mdi-delete",
							action: "delete",
							executeFunction: (selectedItems) => {
								this.deleteRecords(selectedItems)
							},
						},
						{ type: "button", color: "primary", disable: true, icon: "mdi-export", action: "export" },
						{
							type: "button",
							color: "primary",
							disable: true,
							icon: "mdi-import",
							action: "Import",
						},
						{
							type: "slotActivatorBtn",
							color: "primary",
							disable: false,
							icon: "mdi-plus",
							action: "Add",
							executeFunction: () => {
								// eslint-disable-next-line no-console
								this.openAddNewForm()
							},
						},
					],
				},
				actions: {
					items: [
						{
							icon: "mdi-pencil",
							title: "Edit",
							executeFunction: (item) => {
								this.openEditForm(item)
							},
						},
						{
							icon: "mdi-delete",
							title: "Delete",
							executeFunction: (item) => {
								this.deleteRecords(item)
							},
						},
					],
				},
				pagination: {
					onPageChange: (val) => {
						this.pageChange(val)
					},
				},
			},
		}
	},
	computed: {},
	created() {
		this.initializeTableData({ page: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("productTypes", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("productTypes", ["getProductTypes", "getTotalProductTypes"]),
		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			this.initializeData(this.fetchTableData, this.getProductTypes, params)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
	},
}
</script>
