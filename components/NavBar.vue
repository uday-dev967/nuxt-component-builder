<template>
	<div>
		<v-app-bar color="deep-purple accent-4" dark height="64">
			<nuxt-link to="/" class="app-title">
				<v-toolbar-title class="white--text">Nuxt Component Builder</v-toolbar-title>
			</nuxt-link>
			<nuxt-link to="/register">
				<v-btn icon>
					<v-icon>mdi-account-plus</v-icon>
				</v-btn>
			</nuxt-link>
			<nuxt-link to="/login">
				<v-btn icon>
					<v-icon>mdi-login</v-icon>
				</v-btn>
			</nuxt-link>
			<v-spacer></v-spacer>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			searchInput: "",
		}
	},
	methods: {},
}
</script>
<style>
.app-title {
	font-family: "Montserrat", sans-serif;
	font-weight: 700;
	font-size: 1.5em;
	color: #39b982;
	text-decoration: none;
}
</style>
