export async function fetchData(commit, service, payload, mutationTypes) {
	try {
		const response = await service(payload)
		commit(mutationTypes.setData, response.data.countries)
		commit(mutationTypes.setTotal, response.data.total)
		return { success: true, message: "Data fetched successfully", totalEntries: response.data.total }
	} catch (error) {
		if (error.response.status === 400) {
			return { success: false, message: error.response.data.message }
		}
		return { success: false, message: "OOPS! something went wrong" }
	}
}

export async function fetchAllData(commit, service, mutationTypes) {
	try {
		const response = await service()
		commit(mutationTypes.setData, response.data.countries)
		commit(mutationTypes.setTotal, response.data.total)
		// eslint-disable-next-line no-console
		console.log("from country store actions", response)
		return { success: true, message: "Data fetched successfully", totalEntries: response.data.total }
	} catch (error) {
		if (error.response.status === 400) {
			return { success: false, message: error.response.data.message }
		}
		return { success: false, message: "OOPS! something went wrong" }
	}
}

export async function addItem(service, payload) {
	try {
		const response = await service(payload)
		// eslint-disable-next-line no-console
		console.log("posting the new country", response)
		return { success: true, message: "New Item is Added successfully" }
	} catch (error) {
		if (error.response.status === 400) {
			return { success: false, message: error.response.data.message }
		}
		return { success: false, message: "OOPS! something went wrong" }
	}
}

export async function updateItem(service, payload) {
	try {
		const response = await service(payload)
		// eslint-disable-next-line no-console
		console.log("updating the existsing country", response)
		return { success: true, message: "Item Updated Successfully" }
	} catch (error) {
		if (error.response.status === 400) {
			return { success: false, message: error.response.data.message }
		}
		return { success: false, message: "OOPS! something went wrong" }
	}
}

export async function deleteItems(service, payload) {
	try {
		const response = await service(payload)
		// eslint-disable-next-line no-console
		console.log("deleting the existsing country", response)
		return { success: true, message: "Item Deleted Successfully" }
	} catch (error) {
		if (error.response.status === 400) {
			return { success: false, message: error.response.data.message }
		}
		return { success: false, message: "OOPS! something went wrong" }
	}
}
