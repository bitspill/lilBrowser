<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button><span>Logo</span></button>
      <q-toolbar-title>
        Alexandria Browser
      </q-toolbar-title>
      <q-search v-model="searchModel" class="primary titleSearch"></q-search>
      <button><span>Advanced</span></button>
    </div>

    <router-view class="layout-view" :searchQuery="searchModel"></router-view>

    <div slot="footer" class="toolbar">
      <span>lilBrowser v{{lilBrowserVersion}}, Quarsar v{{quasarVersion}}</span>
    </div>
  </q-layout>
</template>

<script>
import Quasar from 'quasar'

export default {
  data () {
    return {
      quasarVersion: Quasar.version,
      lilBrowserVersion: '0.0.1',
      searchModel: ''
    }
  }
}
</script>

<style lang="styl" rel="stylesheet/stylus">
.titleSearch
  width 35%
</style>
