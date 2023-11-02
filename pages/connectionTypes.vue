<template>
	<div>
		<h1>Table Page Example</h1>
		<table-builder
			:table-config="tableConfig"
			:top-bar-config="topBarConfig"
			:pagination="pagination"
			:show-form="showForm"
			:actions="actions"
		>
			<template slot="addForm">
				<dynamic-form
					:key="formKey"
					:form-config="formConfig"
					:data="formData"
					@form-submitted="formSubmission"
				></dynamic-form>
			</template>
		</table-builder>
		<snack-bar ref="snackbar"></snack-bar>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import TableBuilder from "~/components/TableBuilder"
import DynamicForm from "~/components/FormBuilder.vue"
import firstLetterUpperCase from "~/mixins/firstLetterUpperCase.js"
import generalcrud from "~/mixins/generalcrud.js"
import tableFormControls from "~/mixins/formControls.js"
import SnackBar from "~/components/SnackBar.vue"
export default {
	name: "ConnectionTypesPage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
		"snack-bar": SnackBar,
	},
	mixins: [firstLetterUpperCase, generalcrud, tableFormControls],
	data() {
		return {
			formConfig: {
				ref: "exampleTableForm",
				formCofiguredTo: "add",
				fields: [
					{
						type: "text",
						label: "Connection Type Name",
						placeholder: "Connection Type Name",
						key: "connectionTypeName",
						rules: ["required"],
					},
					{
						type: "text",
						label: "Connection Type Code",
						placeholder: "Connection Type Code",
						key: "connectionTypeCode",
						rules: [
							"required",
							(v) => (v && v.length <= 8) || "Connection Type Code must be a maximum of 8 characters.",
						],
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Connection Type Name", value: "connectionTypeName" },
					{ text: "Connection Type Code", value: "connectionTypeCode" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
	computed: {},
	created() {
		this.initializeTableData({ page: this.page - 1, docsPerPage: this.itemsPerPage })
	},

	methods: {
		...mapActions("connectionTypes", ["fetchTableData", "addTableData", "deleteTableData", "updateTableData"]),
		...mapGetters("connectionTypes", ["getConnectionTypes", "getTotalConnectionTypes"]),
		initializeTableData(params = { page: 0, docsPerPage: 10 }) {
			this.initializeData(this.fetchTableData, this.getConnectionTypes, params)
			// eslint-disable-next-line no-console
			console.log("response in the table", this.tableConfig.tableData)
		},
	},
}
</script>
