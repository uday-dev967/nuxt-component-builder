const resolveError = function (error) {
	if (error.response) {
		if (error.response.status === 400) {
			return { success: false, message: error.response.data.message }
		}
	} else if (error.request) {
		return { success: false, message: "OOPS! Server seems dead" }
	}
	return { success: false, message: "OOPS! something went wrong" }
}

export async function fetchData(commit, service, payload, mutationTypes) {
	try {
		const response = await service(payload)
		commit(mutationTypes.setData, response.data)

		return { success: true, message: "Data fetched successfully", totalEntries: response.data.total }
	} catch (error) {
		return resolveError(error)
	}
}

export async function fetchAllData(commit, service, mutationTypes) {
	try {
		const response = await service()
		commit(mutationTypes.setData, response.data)
		commit(mutationTypes.setTotal, response.data.total)
		// eslint-disable-next-line no-console
		console.log("from country store actions", response)
		return { success: true, message: "Data fetched successfully", totalEntries: response.data.total }
	} catch (error) {
		return resolveError(error)
	}
}

export async function addItem(service, payload) {
	try {
		const response = await service(payload)
		// eslint-disable-next-line no-console
		console.log("posting the new country", response)
		return { success: true, message: "New Item is Added successfully" }
	} catch (error) {
		return resolveError(error)
	}
}

export async function updateItem(service, payload) {
	try {
		const response = await service(payload)
		// eslint-disable-next-line no-console
		console.log("updating the existsing country", response)
		return { success: true, message: "Item Updated Successfully" }
	} catch (error) {
		return resolveError(error)
	}
}

export async function deleteItems(service, payload) {
	try {
		const response = await service(payload)
		// eslint-disable-next-line no-console
		console.log("deleting the existsing country", response)
		return { success: true, message: "Item Deleted Successfully" }
	} catch (error) {
		return resolveError(error)
	}
}
