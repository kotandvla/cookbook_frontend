<template>
  <v-card-text style="position: relative">
    <v-layout row justify-center>				
      <v-dialog v-model="DialogVisible" persistent width="800">
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
          <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
          <v-card-title class="headline">
            Редактирование категорий
          </v-card-title>
          <v-card-text>
            <table width=100% class="table">
              <thead>
                <td>ID</td>
                <td>Наименование</td>
                <td>Англ. название категории</td>
              </thead>
              <tbody>
                <tr v-for="(item, index) in Categories" >
                  <td>{{ item.ID }}</td>
                  <td>
                    <v-text-field
                      name="input-2-3"
                      label="Новая категория"
                      class="input-group--focused"
                      single-line
                      v-model="item.title"
                    ></v-text-field>
                  </td>
                  <v-text-field
                      name="input-2-3"
                      label="Англ. название категории"
                      class="input-group--focused"
                      single-line
                      v-model="item.link"
                    ></v-text-field>
                  </td>
                  <td ><a href="#" @click="del_item(index)">del</a></td>
                </tr>
                <tr @keyup.enter="add_item">
                  <td></td>
                  <td>
                    <v-text-field
                      name="input-2-3"
                      label="Англ. название категории"
                      class="input-group--focused"
                      single-line
                      v-model.trim="NewCagetoryName"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                      name="input-2-3"
                      label="Англ. название категории"
                      class="input-group--focused"
                      single-line
                      read-only
                      v-model.trim="NewCategoryEngName"
                    ></v-text-field>
                  </td>
                  <td ><a href="#" @click="add_item">add</a></td>
                </tr>
              </tbody>
            </table>
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
import TranslitRu from 'translit-russian'
import Translit from 'translit'
var trans = Translit(TranslitRu)

export default {
  props: ['inputCategories'],
  name: 'CategoryEdit',
  data () {
    return {
      DialogVisible: false,
      NewCagetoryName: '',
      NewCategoryEngName: '',
      Categories: []
    }
  },
  mounted () {
    this.Categories = JSON.parse(JSON.stringify(this.inputCategories))
  },
  watch: {
    NewCagetoryName (val) {
      this.NewCategoryEngName = trans(this.NewCagetoryName)
    }
  },
  methods: {
    add_item: function () {
      this.Categories.push({
        title: this.NewCagetoryName,
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        link: this.NewCategoryEngName,
        model: false
      })
      this.NewCagetoryName = ''
    },
    del_item: function (value) {
      this.Categories.splice(value, 1)
    },
    DisableChanges: function () {
      this.DialogVisible = false
    },
    SaveChanges: function () {
      this.$emit('update:inputCategories', JSON.parse(JSON.stringify(this.Categories)))
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