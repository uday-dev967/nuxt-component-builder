import { mapActions, mapGetters } from "vuex"

export default {
	methods: {
		...mapActions("connectionTypes", ["fetchAllRecordsConnectionTypes"]),
		...mapGetters("connectionTypes", ["getConnectionTypes"]),
		async getAllConnetionTypesForAutoComplete() {
			const helper = { dropdown: "yes" }
			const data = await this.fetchData(this.fetchAllRecordsConnectionTypes, this.getConnectionTypes, helper)
			// eslint-disable-next-line no-console
			console.log("connection", data)
			const updatedData = data.map((connection) => {
				// eslint-disable-next-line no-console
				console.log("connection", connection)
				return {
					id: connection._id,
					title: connection.connectionTypeName,
					value: connection.connectionTypeName,
				}
			})
			// eslint-disable-next-line no-console
			console.log("updated drop down data", updatedData)
			return updatedData
		},
	},
}
