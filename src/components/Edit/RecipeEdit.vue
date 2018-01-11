<template>
<v-card-text style="position: relative">
    <v-layout row justify-center>				
      <v-dialog v-model="DialogVisible" persistent width="1200">
        <v-btn
          absolute
          dark
          small
          fab
          top
          right
          slot="activator"
          color="pink"
        >
          <v-icon>add</v-icon>
        </v-btn>
        <v-card>
          <v-card-title class="headline">
            Добавить рецепт
          </v-card-title>
          <v-card-text>
            <div class="EditRecipe">
              <v-text-field
                name="input-2-3"
                label="Название рецепта"
                v-model="NewRecipe.RecipeName"
              ></v-text-field>
              <v-select
                :items="Categories"
                v-model="NewRecipe.Category"
                label="Категория"
                single-line
                bottom
              ></v-select>
              <v-text-field
                  name="input-2-3"
                  label="Короткий комментарий"
                  v-model="NewRecipe.ShortComment"
                ></v-text-field>
              <table>
                <thead>
                  <td>Ингредиент</td>
                  <td>Кол-во</td>
                </thead>
                <tbody>
                  <tr v-for="(ingredient, index) in NewRecipe.Ingredients" >
                    <td>
                      <v-text-field
                        name="input-2-3"
                        label="Ингредиент"
                        class="input-group"
                        single-line
                        v-model="ingredient.name"
                      ></v-text-field>
                    </td>
                    <v-text-field
                        name="input-2-3"
                        label="Кол-во"
                        class="input-group"
                        single-line
                        v-model="ingredient.count"
                      ></v-text-field>
                    </td>
                    <td ><a href="#" @click="del_item(index)">del</a></td>
                  </tr>
                  <tr @keyup.enter="add_item">
                    <td>
                      <v-text-field
                        name="input-2-3"
                        label="Ингредиент"
                        class="input-group"
                        single-line
                        v-model.trim="NewIngredientName"
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        name="input-2-3"
                        label="Кол-во"
                        class="input-group"
                        single-line
                        read-only
                        v-model.trim="NewIngredientCount"
                      ></v-text-field>
                    </td>
                    <td ><a href="#" @click="add_item">add</a></td>
                  </tr>
                </tbody>
              </table>              
              <br>
              <v-text-field
                  name="input-1"
                  label="Аннотация"
                  v-model="NewRecipe.Annotation"
                ></v-text-field>
              
              <v-text-field
                name="input-7-1"
                label="Рецепт"
                multi-line
                v-model="NewRecipe.Steps"
              ></v-text-field>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="DisableChanges">Отмена</v-btn>
            <v-btn color="green darken-1" flat @click.native="SaveChanges">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
        </v-dialog>
    </v-layout>
  </v-card-text>
</template>

<script>
export default {
  props: ['id', 'InputCategories'],
  name: 'RecipeEdit',
  data () {
    return {
      DialogVisible: false,
      NewRecipe: {},
      Categories: [],
      NewIngredientName: '',
      NewIngredientCount: ''
    }
  },
  mounted () {
    var tempCat = JSON.parse(JSON.stringify(this.InputCategories))
    this.Categories = tempCat.map(function (Category) {
      return {
        text: Category.title,
        value: Category.ID
      }
    })
  },
  watch: {
  },
  methods: {
    add_item: function () {
      if (!this.NewRecipe.Ingredients) {
        this.NewRecipe.Ingredients = []
      }
      this.NewRecipe.Ingredients.push({
        name: this.NewIngredientName,
        count: this.NewIngredientCount
      })
      this.NewIngredientName = ''
      this.NewIngredientCount = ''
    },
    del_item: function (value) {
      this.ingredients.splice(value, 1)
    },
    DisableChanges: function () {
      this.DialogVisible = false
    },
    SaveChanges: function () {
      this.DialogVisible = false
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