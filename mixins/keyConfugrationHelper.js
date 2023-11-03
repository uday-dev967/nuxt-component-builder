export default {
	data() {
		return {
			formConfig: {
				ref: "exampleTableForm",
				formCofiguredTo: "add",
				fields: [
					{
						type: "text",
						label: "Description",
						placeholder: "Description",
						key: "description",
						rules: ["required"],
					},
					{
						type: "autocomplete",
						label: "Type",
						items: ["Text", "Date", "Boolean", "Image", "Number"],
						key: "type",
						rules: ["required"],
					},
					{
						type: "combobox",
						label: "Mandatory",
						key: "mandatoryField",
						items: ["yes", "no"],
					},
					{
						type: "textArea",
						label: "Note",
						placeholder: "Notes...",
						key: "notes",
					},
				],
			},
			tableConfig: {
				headers: [
					{ text: "Description", value: "description" },
					{ text: "Type", value: "type" },
					{ text: "Mandatory", value: "mandatoryField" },
					{ text: "Note", value: "notes" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
}
