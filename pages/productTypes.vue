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
export default {
	name: "ProductTypesPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
	},
	mixins: [firstLetterUpperCase],
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
						executeFunction: () => {
							this.closeForm()
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
					},
					{
						type: "text",
						label: "Sub Category",
						placeholder: "Sub Category",
						key: "subCategory",
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
		this.initializeProductTypesData({ page: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("productTypes", [
			"fetchProductTypes",
			"addProductType",
			"deleteProductTypes",
			"updateProductType",
		]),
		...mapGetters("productTypes", ["getProductTypes", "getTotalProductTypes"]),
		async initializeProductTypesData(params = { page: 0, docsPerPage: 10 }) {
			try {
				const response = await this.fetchProductTypes(params)
				if (response.status === 200) {
					this.tableConfig.tableData = this.getProductTypes()
					// eslint-disable-next-line no-console
					console.log("initialized", this.tableConfig.tableData)
					this.tableConfig.totalEntries = this.getTotalProductTypes()
				} else {
					throw new Error("Failed to fetch ProductTypes data")
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
			this.page = val
			this.$nextTick(() => {
				this.initializeProductTypesData({
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
		async addNewItem(productType) {
			try {
				const response = await this.addProductType(productType)
				if (response.status === 201) {
					this.initializeProductTypesData({
						page: this.page - 1,
						docsPerPage: this.itemsPerPage,
					})
				} else {
					if (response.status === 400) {
						throw new Error("This ProductType data is already exists")
					}
					throw new Error("Failed to add productType data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
			}
		},
		async editItem(item) {
			try {
				const productType = JSON.parse(JSON.stringify(item))
				const response = await this.updateProductType(productType)
				if (response.status === 200) {
					this.initializeProductTypesData({
						page: this.page - 1,
						docsPerPage: this.itemsPerPage,
					})
				} else {
					if (response.status === 400) {
						throw new Error("This ProductType data is already exists")
					}
					throw new Error("Failed to add productType data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
			}
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
			const selectedProductTypes = Array.isArray(selectedItems) ? selectedItems : [selectedItems]
			// eslint-disable-next-line no-console
			console.log("my delete item", selectedProductTypes)
			const productTypes = selectedProductTypes.map((productType) => productType._id)
			try {
				const response = await this.deleteProductTypes({ ids: productTypes })
				if (response.status === 204) {
					this.page = 1
					this.initializeProductTypesData({
						page: this.page - 1,
						docsPerPage: this.itemsPerPage,
					})
				} else {
					throw new Error("Failed to delete productTypes data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
			}
		},
	},
}
</script>
