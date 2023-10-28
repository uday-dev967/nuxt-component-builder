export default {
	methods: {
		async initializeData(fetchAction, dataGetter, dataCountGetter, params = { page: 0, docsPerPage: 10 }) {
			try {
				const response = await fetchAction(params)
				if (response.status === 200) {
					this.tableConfig.tableData = dataGetter()
					// eslint-disable-next-line no-console
					console.log("initialized", this.tableConfig.tableData)
					this.tableConfig.totalEntries = dataCountGetter()
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
		async addItem(item, addItemAction) {
			try {
				// item.countryRegionName = this.firstLetterUpperCase(item.countryRegionName)
				const response = await addItemAction(item)
				if (response.status === 201) {
					this.initializeTableData({
						page: this.page - 1,
						docsPerPage: this.itemsPerPage,
					})
				} else {
					if (response.status === 400) {
						throw new Error("This Country data is already exists")
					}
					throw new Error("Failed to add country data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
			}
		},
		async editRecord(item, updateAction) {
			try {
				const country = JSON.parse(JSON.stringify(item))
				const response = await updateAction(country)
				if (response.status === 200) {
					this.initializeTableData({
						page: this.page - 1,
						docsPerPage: this.itemsPerPage,
					})
				} else {
					if (response.status === 400) {
						throw new Error("This Country data is already exists")
					}
					throw new Error("Failed to add country data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
			}
		},
		async deleteItems(records, deleteAction) {
			const selectedItems = Array.isArray(records) ? records : [records]
			// eslint-disable-next-line no-console
			console.log("my delete item", selectedItems)
			const items = selectedItems.map((item) => item._id)
			try {
				const response = await deleteAction({ ids: items })
				if (response.status === 204) {
					this.page = 1
					this.initializeTableData({
						page: this.page - 1,
						docsPerPage: this.itemsPerPage,
					})
				} else {
					throw new Error("Failed to delete countries data")
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error) // You might want to log the error.
			}
		},
	},
}
