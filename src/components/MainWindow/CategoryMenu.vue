<template>
  <div>
    <v-list expand v-if='!CategoriesLoaded'>
      Loading...
    </v-list>
    <v-list expand v-else>
      <v-card-text>   
        <template v-for="(category, index) in Categories">
          <v-list-group v-model="category.model" no-action :key="index">
            <v-list-tile slot="item" @click="(category.single ? $router.push('/') : '')">
              <v-list-tile-action>
                <v-icon>{{ category.model || category.single ? category.icon : category['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ category.title }}                 
                  <router-link 
                  v-if="category.link" 
                  :to="{ name: 'ShortCategoryPreview', params: { name: category.link }}">
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
        <category-edit :input-categories.sync='Categories'></category-edit>
      </v-card-text>
      
      <v-card-text style="height: 100px; position: relative">   
        <recipe-edit :input-categories='Categories'></recipe-edit>
      </v-card-text>      
    </v-list>    
  </div>  
</template>

<script>
import CategoryEdit from '@/components/Edit/CategoryEdit'
import RecipeEdit from '@/components/Edit/RecipeEdit'
import CategoryServices from '@/services/CategoryServices'
export default {
  components: {
    CategoryEdit,
    RecipeEdit
  },
  props: [],
  name: 'CategoryMenu',
  data () {
    return {
      CategoriesReadyToEdit: false,
      CategoriesLoaded: false,
      Categories: []
    }
  },
  mounted () {
    this.GetCategory()
    this.CategoriesReadyToEdit = true
  },
  methods: {
    async GetCategory () {
      const response = await CategoryServices.GetCategory()
      this.Categories = response.data.data.sort()
      this.Categories.forEach(element => {
        element.icon = 'keyboard_arrow_up'
        element['icon-alt'] = 'keyboard_arrow_down'
        element.model = false
        element.recipess = []
      })
      this.CategoriesLoaded = true
/*
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
*/
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