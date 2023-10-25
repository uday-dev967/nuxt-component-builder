<template>
	<div>
		<h1>Table Page Example</h1>
		<table-builder :table-config="tableConfig" :user-input-data="userInputData">
			<template slot="addForm">
				<dynamic-form
					:key="formKey"
					:config="formConfig"
					:data="formData"
					@form-submitted="formSubmission"
				></dynamic-form>
			</template>
		</table-builder>
	</div>
</template>

<script>
import TableBuilder from "@/components/TableBuilder"
import DynamicForm from "~/components/FormBuilder.vue"

export default {
	name: "TablePage",
	components: {
		"table-builder": TableBuilder,
		"dynamic-form": DynamicForm,
	},
	data() {
		return {
			userInputData: { itemsPerPage: 20, searchInput: "", selected: [], dialog: false },
			formData: {},
			formKey: 0,
			editIndex: -1,
			editFormConfig: {
				formCofiguredTo: "edit",
				buttons: [
					{ type: "submit", action: "Edit", color: "primary" },
					{
						type: "closeForm",
						action: "close",
						executeFunction: (resetForm) => {
							this.closeForm(resetForm)
						},
					},
				],
			},
			addFormConfig: {
				formCofiguredTo: "add",
				buttons: [
					{ type: "submit", action: "add", color: "primary" },
					{
						type: "closeForm",
						action: "close",
						executeFunction: (resetForm) => {
							this.closeForm(resetForm)
						},
					},
				],
			},
			formConfig: {
				ref: "exampleTableForm",
				formCofiguredTo: "add",
				fields: [
					{
						type: "text",
						label: "Name",
						placeholder: "Desert Name",
						value: "hai tere",
						key: "name",
						rules: ["required"],
					},
					{
						type: "number",
						label: "Calories",
						placeholder: "Enter Calories",
						key: "calories",
						rules: ["required"],
					},
					{
						type: "number",
						label: "Fat",
						placeholder: "Enter fat",
						key: "fat",
						rules: ["required"],
					},
					{
						type: "number",
						label: "carb",
						placeholder: "Enter Carb",
						key: "carbs",
						rules: ["required"],
					},
					{
						type: "number",
						label: "Protein",
						placeholder: "Enter Protein",
						key: "protein",
						rules: ["required"],
					},
					{
						type: "number",
						label: "iron",
						placeholder: "Enter iron",
						key: "iron",
						rules: ["required"],
					},
				],
				buttons: [
					{ type: "submit", action: "add", color: "primary" },
					{
						type: "closeForm",
						action: "close",
						executeFunction: (resetForm) => {
							this.closeForm(resetForm)
						},
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Dessert Name", value: "name" },
					{ text: "Calories", value: "calories" },
					{ text: "Fat (g)", value: "fat" },
					{ text: "Carbs (g)", value: "carbs" },
					{ text: "Protein (g)", value: "protein" },
					{ text: "Iron (g)", value: "iron" },
					{ text: "Actions", value: "actions", sortable: false },
				],
				tableData: [
					{
						id: 1,
						name: "Frozen Yogurt",
						calories: 159,
						fat: 6.0,
						carbs: 24,
						protein: 4.0,
						iron: 8,
					},
					{
						id: 2,
						name: "Ice cream sandwich",
						calories: 237,
						fat: 9.0,
						carbs: 37,
						protein: 4.3,
						iron: 1,
					},
					{
						id: 3,

						name: "Frozen Yogurt",
						calories: 159,
						fat: 6.0,
						carbs: 24,
						protein: 4.0,
						iron: 8,
					},
					{
						id: 4,

						name: "Eclair",
						calories: 262,
						fat: 16.0,
						carbs: 23,
						protein: 6.0,
						iron: 7,
					},
					{
						id: 5,

						name: "Cupcake",
						calories: 305,
						fat: 3.7,
						carbs: 67,
						protein: 4.3,
						iron: 8,
					},
					{
						id: 6,

						name: "Frozen Yogurt",
						calories: 159,
						fat: 6.0,
						carbs: 24,
						protein: 4.0,
						iron: 8,
					},
					{
						id: 7,

						name: "Gingerbread",
						calories: 356,
						fat: 16.0,
						carbs: 49,
						protein: 3.9,
						iron: 16,
					},
					{
						id: 8,

						name: "Jelly bean",
						calories: 375,
						fat: 0.0,
						carbs: 94,
						protein: 0.0,
						iron: 0,
					},

					{
						id: 9,

						name: "Honeycomb",
						calories: 408,
						fat: 3.2,
						carbs: 87,
						protein: 6.5,
						iron: 45,
					},
					{
						id: 10,

						name: "Donut",
						calories: 452,
						fat: 25.0,
						carbs: 51,
						protein: 4.9,
						iron: 22,
					},
					{
						id: 11,

						name: "KitKat",
						calories: 518,
						fat: 26.0,
						carbs: 65,
						protein: 7,
						iron: 6,
					},
				],
				topBarConfig: {
					fields: [
						{
							type: "combobox",
							disable: false,
							label: "Show",
							fieldType: "number",
							key: "itemsPerPage",
							items: [5, 10, 20],
						},
						{ type: "text", disable: false, placeHolder: "", label: "search", key: "searchInput" },
						{ type: "spacer", col: 5 },
						{ type: "button", color: "primary", disable: true, icon: "mdi-delete", action: "delete" },
						{ type: "button", color: "primary", disable: true, icon: "mdi-export", action: "export" },
						{
							type: "button",
							color: "primary",
							disable: true,
							icon: "mdi-import",
							action: "Import",
						},
						{
							type: "slotActivatorBtn",
							color: "primary",
							disable: false,
							icon: "mdi-plus",
							action: "Add",
							executeFunction: () => {
								// eslint-disable-next-line no-console
								this.openAddNewForm()
							},
						},
					],
				},
				actions: {
					items: [
						{
							icon: "mdi-pencil",
							title: "Edit",
							executeFunction: (item) => {
								this.openEditForm(item)
							},
						},
						{
							icon: "mdi-delete",
							title: "Delete",
							executeFunction: (item) => {
								this.deleteRecord(item)
							},
						},
					],
				},
			},
		}
	},
	methods: {
		formSubmission(newItem, resetForm) {
			// eslint-disable-next-line no-console
			console.log("Register form submitted with data:", newItem)
			if (this.formConfig.formCofiguredTo === "add") {
				const item = JSON.parse(JSON.stringify(newItem))
				this.addNewItem(item)
			} else {
				this.editItem(newItem)
			}
		},
		addNewItem(newItem) {
			this.tableConfig.tableData.push(newItem)
		},
		editItem(item) {
			if (this.editIndex !== -1) {
				this.tableConfig.tableData[this.editIndex] = { ...this.tableConfig.tableData[this.editIndex], ...item }
				const newData = JSON.parse(JSON.stringify(this.tableConfig.tableData))
				this.tableConfig.tableData = []
				setTimeout(() => {
					this.tableConfig.tableData = newData
				}, 1000)
			}
			// eslint-disable-next-line no-console
		},
		closeForm(resetForm) {
			this.userInputData.dialog = false
			// eslint-disable-next-line no-console
			this.formData = {}
			resetForm()
		},
		openAddNewForm() {
			this.formConfig = { ...this.formConfig, ...this.addFormConfig }
			this.formData = {}
			this.userInputData.dialog = true
			this.formKey++
		},
		openEditForm(item) {
			this.formConfig = { ...this.formConfig, ...this.editFormConfig }
			this.editIndex = this.tableConfig.tableData.findIndex((eachItem) => eachItem.id === item.id)
			// eslint-disable-next-line no-console
			console.log("my item", item)
			this.formData = JSON.parse(JSON.stringify(item))
			this.userInputData.dialog = true
			this.formKey++
		},
		deleteRecord(item) {
			// eslint-disable-next-line no-console
			console.log("my delete item", item)
		},
	},
}
</script>
