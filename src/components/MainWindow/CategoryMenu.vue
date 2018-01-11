<template>
  <div>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            <router-link :to="{ name: 'StartPage' }">Книга рецептов :)</router-link>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list expand>
      <template v-for="(category, index) in categories">
        <v-list-group v-model="category.model" no-action>
          <v-list-tile slot="item" @click="(category.single ? $router.push('/') : '')">
            <v-list-tile-action>
              <v-icon>{{ category.model || category.single ? category.icon : category['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ category.title }}                 
                <router-link 
                v-if="category.link" 
                :to="{ name: 'CategoryView', params: { name: category.link }}">
                  Тыц
                </router-link>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(recipe, i) in category.recipes"
            :key="i"
            @click="$router.push({ name: 'RecipeView', params: { id: recipe.id }})"
          >
              <v-list-tile-action v-if="recipe.icon">
                <v-icon>{{ recipe.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title><router-link v-if="category.link" :to="{ name: 'RecipeView', params: { id: recipe.id}}">{{ recipe.title }} </router-link></v-list-tile-title>
              </v-list-tile-content>      
          </v-list-tile>
        </v-list-group>
      </template>
      <v-card-text style="height: 100px; position: relative">   
        <category-edit :input-categories.sync='categories'></category-edit>
      </v-card-text>
      
      <v-card-text style="height: 100px; position: relative">   
        <recipe-edit :input-categories='categories'></recipe-edit>
      </v-card-text>      
    </v-list>    
  </div>  
</template>

<script>
import CategoryEdit from '@/components/Edit/CategoryEdit'
import RecipeEdit from '@/components/Edit/RecipeEdit'
export default {
  components: {
    CategoryEdit,
    RecipeEdit
  },
  props: [],
  name: 'CategoryMenu',
  data () {
    return {
      categories: [
        {
          ID: 1,
          title: 'Горячее',
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          link: 'hot',
          model: false,
          recipes: [
            { title: 'Котлеты', id: '1', selected: false },
            { title: 'Курица', id: '2', selected: false }
          ]
        },
        {
          ID: 2,
          title: 'Закуски',
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          link: 'snacks',
          model: false,
          recipes: [
            { title: 'Бутеры с сыром', id: '3', selected: false },
            { title: 'Оливки в сыре', id: '4', selected: false }
          ]
        }
      ]
    }
  },
  created () {
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