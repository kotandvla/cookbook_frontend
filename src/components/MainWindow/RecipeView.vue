<template>
	<div class="RecipeView">
    {{id}}
		<h1>{{ recipe.name }}</h1>
		  <hr>
		<h2>{{ recipe.short_comemnt }}</h2>
		  <hr>
		<ul>
			<li v-for="ingredient in recipe.ingredients"> <b>{{ ingredient.name }}</b>: {{ ingredient.count }} </li>
		</ul>
    <br>
    <p>{{ recipe.annotation }}</p>

    <p>{{ recipe.steps }}</p>

	</div>
</template>

<script>
export default {
  props: ['id'],
  name: 'RecipeView',
  data () {
    return {
      recipe: { }
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
    id: function (val) {
      // this.GetRecipe(val)
    }
  },
  methods: {
  }
}
</script>

<style>
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 30px;
  }
</style>