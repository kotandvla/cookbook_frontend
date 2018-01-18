<template>
	<div class="ShortCategoryPreview">
    {{ name }}
    <div v-for="recipe in recipes">
      <h2>{{ recipe.name }} ({{ recipe.time }})</h2>
        <hr>
      <h3>{{ recipe.short_comemnt }}</h3>
      <hr>
        <p>{{ recipe.annotation }}</p>
        <br>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name'],
  name: 'ShortCategoryPreview',
  data () {
    return {
      recipes: [
        {
          name: 'Бутерброды с сыром',
          short_comemnt: 'Атас в праздники',
          annotation: 'Готвится за 10 минут, всегда выручает.',
          time: '10 минут'
        },
        {
          name: 'Макароны по флотски',
          short_comemnt: 'Блюдо на все случаи жизни',
          annotation: 'Данное блюдо спасало меня не раз и не два.',
          time: '10 минут'
        }
      ]
    }
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