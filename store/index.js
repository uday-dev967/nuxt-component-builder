import * as country from "@/store/modules/country.js"
import * as productTypes from "~/store/modules/productTypes.js"
import * as materialTypes from "~/store/modules/materialTypes.js"
import * as connectionTypes from "~/store/modules/connectionTypes.js"
import * as masterPipe from "~/store/modules/masterPipe.js"
import * as commonProductFields from "~/store/modules/commonProductFields.js"
import * as pipeParameters from "~/store/modules/pipeParameters.js"
import * as pipeFittingTypes from "~/store/modules/pipeFittingTypes.js"
import * as normalPipeFittingParameters from "~/store/modules/normalPipeFittingParameters.js"
import * as specialPipeFittingParameters from "~/store/modules/specialPipeFittingParameters.js"
import * as dWVPipeFittingParameters from "~/store/modules/dWVPipeFittingParameters.js"
import * as plumbingFixtureParameters from "~/store/modules/plumbingFixtureParameters.js"
import * as valveParameters from "~/store/modules/valveParameters.js"
import * as mechanicalEquipmentParameters from "~/store/modules/mechanicalEquipmentParameters.js"

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
		commonProductFields,
		pipeParameters,
		pipeFittingTypes,
		normalPipeFittingParameters,
		specialPipeFittingParameters,
		dWVPipeFittingParameters,
		plumbingFixtureParameters,
		valveParameters,
		mechanicalEquipmentParameters,
	},
}
