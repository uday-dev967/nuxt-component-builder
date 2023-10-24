<template>
	<v-app dark>
		<client-only>
			<nav-bar />
			<v-main>
				<v-container>
					<Nuxt />
				</v-container>
			</v-main>
		</client-only>
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
