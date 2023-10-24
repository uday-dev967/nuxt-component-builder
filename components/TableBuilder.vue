<template>
	<div>
		<v-data-table
			v-model="localInputData.selected"
			:headers="tableConfig.headers"
			:items="tableConfig.tableData"
			item-key="id"
			:items-per-page="localInputData.itemsPerPage || 10"
			hide-default-footer
			class="elevation-1"
			show-select
		>
			<!-- <template #header.name="{ header }">
				{{ header.text.toUpperCase() }}
			</template> -->
			<template #top>
				<v-toolbar flat>
					<v-row class="mt-2">
						<v-col v-for="(field, index) in tableConfig.topBarConfig.fields" :key="index">
							<v-text-field
								v-if="field.type === 'text'"
								v-model="localInputData[field.key]"
								:cols="field.col || col"
								:label="field.label"
								:placeholder="field.placeholder"
								:type="field.fieldType || 'text'"
								:disabled="field.disable || false"
							></v-text-field>
							<v-combobox
								v-else-if="field.type === 'combobox'"
								v-model.number="localInputData[field.key]"
								:label="field.label"
								:items="field.items"
								:multiple="field.multiple"
								:disabled="field.disable || false"
								item-text="value"
								item-value="id"
							></v-combobox>
							<v-spacer v-else-if="field.type === 'spacer'"></v-spacer>

							<v-btn
								v-else-if="field.type === 'button'"
								:disabled="field.disable"
								:color="field.color"
								small
								class="mr-1"
								@click="() => buttonClickFunction(field)"
							>
								<v-icon left>{{ field.icon }}</v-icon>
								{{ field.action }}
							</v-btn>
							<v-dialog
								v-else-if="field.type === 'slotActivatorBtn'"
								v-model="localInputData.dialog"
								max-width="500px"
							>
								<template #activator="{ on }">
									<v-btn :disabled="field.disable" :color="field.color" small class="mr-1" v-on="on">
										<v-icon left>{{ field.icon }}</v-icon>
										{{ field.action }}
									</v-btn>
								</template>
								<v-card class="p-5">
									<slot name="addForm"></slot>
								</v-card>
							</v-dialog>
						</v-col>
					</v-row>
				</v-toolbar>
			</template>
			<template #footer>
				<v-toolbar class="mt-4">
					<v-row justify="center" align="center">
						<v-col>
							<p>showing entries appear here</p>
						</v-col>
						<v-spacer></v-spacer>
						<v-col cols="5">
							<v-pagination v-model="page" :length="pageCount" circle></v-pagination>
						</v-col>
					</v-row>
				</v-toolbar>
			</template>
			<template #[`item.actions`]="{ item }">
				<v-menu offset-y>
					<template #activator="{ on, attrs }">
						<v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical </v-icon>
					</template>
					<v-list>
						<v-list-item v-for="(action, index) in tableConfig.actions.items" :key="index">
							<v-list-item-title @click="() => action.executeFunction(item)">
								<v-icon small left>{{ action.icon }}</v-icon>
								{{ action.title }}
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
		</v-data-table>
	</div>
</template>

<script>
export default {
	name: "TableBuilder",
	props: {
		tableConfig: {
			type: Object,
			required: true,
		},
		userInputData: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			page: 1,
			pageCount: 100,
			searchInput: "",
			col: 1,
			localInputData: this.userInputData,
			dialog: false,
		}
	},
	methods: {
		editItem(item) {
			// eslint-disable-next-line no-console
			console.log(item)
		},
		deleteItem(item) {
			// eslint-disable-next-line no-console
			console.log(item)
		},
		buttonClickFunction(button) {
			button.executeFunction()
		},
	},
}
</script>
//
<style lang="scss" scoped>
.v-divider {
	background-color: grey;
}
.v-list-item {
	cursor: pointer;
	&:hover {
		background-color: rgb(203, 202, 202);
	}
}
</style>
