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
						type: "switch",
						label: "Manidatory",
						key: "maidatory",
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
					{ text: "Description", value: "connectionTypeName" },
					{ text: "Type", value: "connectionTypeCode" },
					{ text: "Note", value: "notes" },
				],
				tableData: [],
				totalEntries: 0,
			},
		}
	},
}
