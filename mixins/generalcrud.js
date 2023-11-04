export default {
	methods: {
		setSnackBar(message, color) {
			this.$refs.snackbar.showSnackbar(message, color)
		},
		async initializeData(fetchAction, dataGetter, params = { page: 0, docsPerPage: 10 }, helpers) {
			const response = await fetchAction(params)
			if (response.success) {
				if (helpers?.configureTableData) {
					const data = dataGetter()
					// eslint-disable-next-line no-console
					console.log("data from getter", data)
					this.tableConfig.tableData = helpers.configureTableData(data)
					this.tableConfig.totalEntries = response.totalEntries
				} else {
					this.tableConfig.tableData = dataGetter()
					// eslint-disable-next-line no-console
					console.log("initialized", this.tableConfig.tableData)
					this.tableConfig.totalEntries = response.totalEntries
				}
			} else {
				this.setSnackBar(response.message, "error")
			}
		},
		async addItem(item, addItemAction) {
			// eslint-disable-next-line no-console
			console.log("from grenral curd add new", item)
			let updatedItem = JSON.parse(JSON.stringify(item))
			if (this.crudFormHelper) {
				updatedItem = await this.crudFormHelper(updatedItem)
			}
			const response = await addItemAction(updatedItem)
			if (response.success) {
				this.initializeTableData({
					page: this.page - 1,
					docsPerPage: this.itemsPerPage,
				})
				this.setSnackBar(response.message, "success")
			} else {
				this.setSnackBar(response.message, "error")
			}
		},
		async editRecord(item, updateAction) {
			let updatedItem = JSON.parse(JSON.stringify(item))
			if (this.crudFormHelper) {
				updatedItem = await this.crudFormHelper(updatedItem)
				// eslint-disable-next-line no-console
				console.log("curd form helper edit", updatedItem)
			}
			const response = await updateAction(updatedItem)
			if (response.success) {
				this.initializeTableData({
					page: this.page - 1,
					docsPerPage: this.itemsPerPage,
				})
				this.setSnackBar(response.message, "success")
			} else {
				this.setSnackBar(response.message, "error")
			}
		},
		async deleteItems(records, deleteAction) {
			const selectedItems = Array.isArray(records) ? records : [records]
			// eslint-disable-next-line no-console
			console.log("my delete item", selectedItems)

			const items = selectedItems.map((item) => item._id)

			const response = await deleteAction({ ids: items })
			if (response.success) {
				this.page = 1
				this.initializeTableData({
					page: this.page - 1,
					docsPerPage: this.itemsPerPage,
				})
				this.setSnackBar(response.message, "success")
			} else {
				this.setSnackBar(response.message, "error")
			}
		},

		addNewItem(item) {
			this.addItem(item, this.addTableData)
		},
		editItem(item) {
			this.editRecord(item, this.updateTableData)
		},

		deleteRecords(selectedItems) {
			this.deleteItems(selectedItems, this.deleteTableData)
		},
	},
}
