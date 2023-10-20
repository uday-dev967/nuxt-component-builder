<template>
	<div class="text-center">
		<v-menu offset-y>
			<template #activator="{ on, attrs  }">
				<v-btn dark v-bind="attrs" v-on="on"> Dropdown {{attrs}}</v-btn>
			</template>
			<v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
		</v-menu>
	</div>
</template>

<script>
export default {
	data() {return {
		items: [{ title: "Click Me1" }, { title: "Click Me2" }, { title: "Click Me3" }, { title: "Click Me4" }], atts: {"color": "orange"} 
	}},
}
</script>
