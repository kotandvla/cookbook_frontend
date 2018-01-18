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
                <td>Наименование</td>
                <td>Англ. название категории</td>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in Categories"
                  :key="index" 
                  :title="item.title"
                >
                  <td>
                    <v-text-field
                      name="input-2-3"
                      label="Название категории"
                      class="input-group--focused"
                      single-line
                      v-model="item.title"
                    ></v-text-field>
                  </td>
                  <td>
                    <v-text-field
                        name="input-2-3"
                        label="Англ. название категории"
                        class="input-group--focused"
                        single-line
                        v-model="item.link"
                    ></v-text-field>
                  </td>
                  <td >
                    <button @click="RemoveItem(index)">X</button>
                  </td>
                </tr>
                <tr @keyup.enter="add_item">
                  <td>
                    <v-text-field
                      name="input-2-3"
                      label="Новая категория"
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
                  <td>                    
                    <button @click="AddItem">+</button>
                  </td>
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
import CategoryServices from '@/services/CategoryServices'

var trans = Translit(TranslitRu)

export default {
  props: ['inputCategories'],
  name: 'CategoryEdit',
  data () {
    return {
      ErrorInInput: false,
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
    Categories (val) { },
    NewCagetoryName (val) {
      this.NewCategoryEngName = trans(this.NewCagetoryName)
    }
  },
  methods: {
    AddItem: function () {
      this.Categories.push({
        title: this.NewCagetoryName,
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        link: this.NewCategoryEngName,
        model: false
      })
      this.NewCagetoryName = ''
    },
    RemoveItem: function (value) {
      this.Categories.splice(value, 1)
    },
    DisableChanges: function () {
      this.DialogVisible = false
    },
    SaveChanges: function () {
      if (!this.ErrorInInput) {
        this.SetCategory(this.Categories).then(result => {
          console.log(result)
          if (result.status === 'OK') {
            this.$emit('update:inputCategories', JSON.parse(JSON.stringify(this.Categories)))
            this.DialogVisible = false
          }
        })
      }
    },
    async SetCategory (NewCategories) {
      let OutArray = NewCategories.map(category => {
        return {
          _id: category._id,
          title: category.title,
          link: category.link
        }
      })
      CategoryServices.SetCategory(OutArray).then((result) => {
        console.log(result)
        return result.data
      })
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