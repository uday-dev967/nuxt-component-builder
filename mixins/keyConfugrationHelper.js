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
						items: [
							{ id: "text", value: "Text" },
							{ id: "date", value: "Date" },
							{ id: "boolean", value: "Boolean" },
							{ id: "image", value: "Image" },
							{ id: "number", value: "Number" },
						],
						key: "type",
						rules: ["required"],
					},
					{
						type: "combobox",
						label: "Mandatory",
						key: "mandatory",
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
					{ text: "Mandatory", value: "mandatory" },
					{ text: "Note", value: "notes" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
}
