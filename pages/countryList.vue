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
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import TableBuilder from "~/components/TableBuilder"
import DynamicForm from "~/components/FormBuilder.vue"
import firstLetterUpperCase from "~/mixins/firstLetterUpperCase.js"
import generalcrud from "~/mixins/generalcrud.js"

export default {
	name: "TablePage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
	},
	mixins: [firstLetterUpperCase, generalcrud],
	data() {
		return {
			showForm: false,
			itemsPerPage: 5,
			page: 1,
			formData: {},
			formKey: 0,
			editIndex: -1,
			editFormConfig: {
				formCofiguredTo: "edit",
				buttons: [
					{ type: "submit", action: "Edit", color: "primary" },
					{
						type: "closeForm",
						action: "close",
						executeFunction: () => {
							this.closeForm()
						},
					},
				],
			},
			addFormConfig: {
				formCofiguredTo: "add",
				buttons: [
					{ type: "submit", action: "add", color: "primary" },
					{
						type: "closeForm",
						action: "close",
						executeFunction: (resetForm) => {
							this.closeForm(resetForm)
						},
					},
				],
			},
			formConfig: {
				ref: "exampleTableForm",
				formCofiguredTo: "add",
				fields: [
					{
						type: "text",
						label: "Country Name",
						placeholder: "Country",
						key: "countryRegionName",
						rules: ["required"],
					},
					{
						type: "text",
						label: "Country Code",
						placeholder: "Country Code",
						key: "countryRegionCode",
					},
					{
						type: "textArea",
						label: "Note",
						placeholder: "Country",
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
					{ text: "Country Name", value: "countryRegionName" },
					{ text: "Country Code", value: "countryRegionCode" },
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
		...mapActions("country", ["fetchCountries", "addCountry", "deleteCountries", "updateCountry"]),
		...mapGetters("country", ["getCountries", "getTotalCountries"]),
		async initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			await this.initializeData(this.fetchCountries, this.getCountries, this.getTotalCountries, params)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
		pageChange(val) {
			// eslint-disable-next-line no-console
			console.log("onPageChange", val)
			this.page = val
			this.$nextTick(() => {
				this.initializeTableData({
					page: val - 1,
					docsPerPage: this.itemsPerPage,
				})
			})
		},
		changeItemsPerPage(val) {
			// eslint-disable-next-line no-console
			console.log("onItemsCountChange", val)
			this.itemsPerPage = val
			this.page = 1
			this.pageChange(1)
		},
		formSubmission(newItem) {
			// eslint-disable-next-line no-console
			console.log("Register form submitted with data:", newItem)
			if (this.formConfig.formCofiguredTo === "add") {
				const item = JSON.parse(JSON.stringify(newItem))
				this.addNewItem(item)
			} else {
				this.editItem(newItem)
			}
			this.showForm = false
		},
		async addNewItem(country) {
			await this.addItem(country, this.addCountry)
		},
		async editItem(item) {
			await this.editRecord(item, this.updateCountry)
		},
		closeForm() {
			this.formData = {}
			// eslint-disable-next-line no-console
			console.log("form closing")
			this.showForm = false
		},
		openAddNewForm() {
			this.formConfig = { ...this.formConfig, ...this.addFormConfig }
			this.formData = {}
			this.showForm = true
			this.formKey++
		},
		openEditForm(item) {
			this.formConfig = { ...this.formConfig, ...this.editFormConfig }
			this.editIndex = this.tableConfig.tableData.findIndex((eachItem) => eachItem.id === item.id)
			// eslint-disable-next-line no-console
			// console.log("my item", item)
			this.formData = JSON.parse(JSON.stringify(item))
			this.showForm = true
			this.formKey++
		},
		async deleteRecords(selectedItems) {
			await this.deleteItems(selectedItems, this.deleteCountries)
		},
	},
}
</script>
