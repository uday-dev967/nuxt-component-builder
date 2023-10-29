export default {
	methods: {
		setSnackBar(message, color) {
			this.$refs.snackbar.showSnackbar(message, color)
		},
		async initializeData(fetchAction, dataGetter, params = { page: 0, docsPerPage: 10 }) {
			const response = await fetchAction(params)
			if (response.success) {
				this.tableConfig.tableData = dataGetter()
				// eslint-disable-next-line no-console
				console.log("initialized", this.tableConfig.tableData)
				this.tableConfig.totalEntries = response.totalEntries
			} else {
				this.setSnackBar(response.message, "error")
			}
		},
		async addItem(item, addItemAction) {
			const response = await addItemAction(item)
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
			const editedItem = JSON.parse(JSON.stringify(item))
			const response = await updateAction(editedItem)
			if (response.success) {
				this.initializeTableData({
					page: this.page - 1,
					docsPerPage: this.itemsPerPage,
				})
				this.setSnackBar(response.message, "success")
			} else {
				this.setSnackBar(response.message, "success")
			}
		},
		async deleteItems(records, deleteAction) {
			const selectedItems = Array.isArray(records) ? records : [records]
			// eslint-disable-next-line no-console
			console.log("my delete item", selectedItems)
			const UserConfirm = window.confirm("Are you sure you want to DELETE")
			const items = selectedItems.map((item) => item._id)
			if (UserConfirm) {
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
			}
		},
	},
}
