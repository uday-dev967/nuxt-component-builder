export default {
	data() {
		return {
			pagination: {
				onPageChange: (val) => {
					this.pageChange(val)
				},
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
			showForm: false,
			itemsPerPage: 5,
			page: 1,
			formData: {},
			formKey: 0,
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
		}
	},
	methods: {
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
			// this.editIndex = this.tableConfig.tableData.findIndex((eachItem) => eachItem.id === item.id)
			// eslint-disable-next-line no-console
			// console.log("my item", item)
			this.formData = JSON.parse(JSON.stringify(item))
			this.showForm = true
			this.formKey++
		},
	},
}
