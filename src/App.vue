<template>
  <v-app light>
    <!-- Левая панель -->    
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
    >
      <category-menu></category-menu>
    </v-navigation-drawer>

    <!-- Верхняя панель -->
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        light
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <router-link :to="{ name: 'StartPage' }">
        <v-toolbar-title v-text="title">
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Основное окно -->
    <main>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            
            <router-view>
            </router-view>

          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </main>

    <!-- Правая скрытая панель -->
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-footer :fixed="fixed">
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import CategoryMenu from '@/components/MainWindow/CategoryMenu'
  export default {
    components: {
      CategoryMenu
    },
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        dialog: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Книга рецептов :)'
      }
    }
  }
</script>
