export default {
	methods: {
		async initializeData(params = { page: 0, docsPerPage: 10 }, fetchAction, dataGetter, dataCountGetter) {
			try {
				const response = await this.fetchAction(params)
				if (response.status === 200) {
					this.tableConfig.tableData = this.dataGetter()
					// eslint-disable-next-line no-console
					console.log("initialized", this.tableConfig.tableData)
					this.tableConfig.totalEntries = this.dataCountGetter()
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
	},
}
