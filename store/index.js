import * as country from "@/store/modules/country.js"
import * as productTypes from "~/store/modules/productTypes.js"
import * as materialTypes from "~/store/modules/materialTypes.js"
import * as connectionTypes from "~/store/modules/connectionTypes.js"
import * as masterPipe from "~/store/modules/masterPipe.js"

export default {
	state() {
		return {}
	},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		country,
		productTypes,
		materialTypes,
		connectionTypes,
		masterPipe,
	},
}
