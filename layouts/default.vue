<template>
	<v-app dark>
		<nav-bar />
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import NavBar from "~/components/NavBar.vue"
export default {
	name: "DefaultLayout",
	components: {
		"nav-bar": NavBar,
	},
	data() {
		return {}
	},
}
</script>
