export default {
	methods: {
		async fetchData(fetchAction, dataGetter, helpers) {
			const response = await fetchAction(helpers)
			if (response.success) {
				const data = dataGetter()
				if (helpers?.configureData) {
					if (helpers.wheretoStore) {
						helpers.wheretoStore = helpers.configureData(data)
					}
					return helpers.configureData(data)
				}
				return data
			} else {
				this.setSnackBar(response.message, "error")
			}
		},
	},
}
