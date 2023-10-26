<template>
	<div>
		<h1>Table Page Example</h1>
		<table-builder :table-config="tableConfig" :user-input-data="userInputData" :show-form="showForm">
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
export default {
	name: "TablePage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
	},
	mixins: [firstLetterUpperCase],
	data() {
		return {
			showForm: false,
			userInputData: {
				// can only serves the inital data as a prop (in child) but do not accept any mutations from child
				itemsPerPage: 5,
				page: 1,
				searchInput: "",
				selected: [],
			},
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
								this.deleteRecord(item)
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
		this.initializeCountryData({ page: this.userInputData.page - 1, docsPerPage: this.userInputData.itemsPerPage })
	},

	methods: {
		...mapActions("country", ["fetchCountries", "addCountry", "deleteCountries"]),
		...mapGetters("country", ["getCountries", "getTotalCountries"]),
		async initializeCountryData(params = { page: 0, docsPerPage: 10 }) {
			try {
				const response = await this.fetchCountries(params)
				if (response.ok) {
					this.tableConfig.tableData = this.getCountries()
					// eslint-disable-next-line no-console
					console.log("initialized", this.tableConfig.tableData)
					this.tableConfig.totalEntries = this.getTotalCountries()
				} else {
					throw new Error("Failed to fetch countries data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
				return [] // Return an empty array as a fallback.
			}
			// eslint-disable-next-line no-console
			console.log("res", this.tableConfig.tableData)
		},
		pageChange(val) {
			// eslint-disable-next-line no-console
			console.log("onPageChange", val)
			this.userInputData.pageCount = val
			this.$nextTick(() => {
				this.initializeCountryData({
					page: val - 1,
					docsPerPage: this.userInputData.itemsPerPage,
				})
			})
		},
		changeItemsPerPage(val) {
			// eslint-disable-next-line no-console
			console.log("onItemsCountChange", val)
			this.userInputData.itemsPerPage = val || 5
			this.$nextTick(() => {
				this.initializeCountryData({
					page: this.userInputData.page - 1,
					docsPerPage: val,
				})
			})
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
			try {
				country.countryRegionName = this.firstLetterUpperCase(country.countryRegionName)
				const response = await this.addCountry(country)
				if (response.ok) {
					this.initializeCountryData({
						page: this.userInputData.page - 1,
						docsPerPage: this.userInputData.itemsPerPage,
					})
				} else {
					throw new Error("Failed to fetch countries data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
				return [] // Return an empty array as a fallback.
			}
		},
		editItem(item) {
			if (this.editIndex !== -1) {
				this.tableConfig.tableData[this.editIndex] = { ...this.tableConfig.tableData[this.editIndex], ...item }
				const newData = JSON.parse(JSON.stringify(this.tableConfig.tableData))
				this.tableConfig.tableData = []
				setTimeout(() => {
					this.tableConfig.tableData = newData
				}, 1000)
			}
			// eslint-disable-next-line no-console
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
		deleteRecords(selectedItems) {
			// eslint-disable-next-line no-console
			console.log("my delete item", selectedItems)
		},
	},
}
</script>
