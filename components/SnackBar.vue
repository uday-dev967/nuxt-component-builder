<template>
	<v-snackbar v-model="snackbar" :timeout="timeout">
		<v-row justify="center" align="center">
			{{ message }}
			<v-spacer></v-spacer>
			<v-btn dark :color="snackbarColor" text @click="snackbar = false">Close</v-btn>
		</v-row>
	</v-snackbar>
</template>

<script>
export default {
	data() {
		return {
			snackbar: false,
			message: "",
			timeout: 6000, // Snackbar duration in milliseconds
			snackbarColor: "success", // Color of the snackbar (success, error, etc.)
		}
	},
	methods: {
		showSnackbar(message, color = "success") {
			this.message = message
			this.snackbarColor = color
			this.snackbar = true
		},
	},
}
</script>
