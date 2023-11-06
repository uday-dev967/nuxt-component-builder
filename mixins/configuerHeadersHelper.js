export default {
	methods: {
		async configureTableHeaders(fetchAction, dataGetter) {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(fetchAction, dataGetter, helper)
			// eslint-disable-next-line no-console
			console.log("retrive", data)
			const updatedData = data.map((item) => {
				// eslint-disable-next-line no-console
				console.log("retriving", item)
				return {
					// id: item._id,
					text: item.description,
					value: item.description,
				}
			})
			// eslint-disable-next-line no-console
			console.log("updated drop down data", updatedData)
			return updatedData
		},
	},
}
