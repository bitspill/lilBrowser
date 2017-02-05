<template>
  <router-link :to="filterRoute" class="filterToggle">
    <div class="imgWrap" :class="{active: isActive, notActive: !isActive}">
      <img :src="iconSRC"/>
    </div>
    <span>{{label}}</span>
  </router-link>
</template>

<script>
  import deepCopy from 'lilBrowser'

  export default {
    data () {
      return {}
    },
    computed: {
      iconSRC () {
        return require('../assets/' + this.icon + '-icon.svg')
      },
      isActive () {
        return this.activeTypes.includes(this.label.toLowerCase())
      },
      filterRoute () {
        if (this.label.toLowerCase() === 'all') {
          return '/media/'
        }
        if (this.isActive) {
          if (this.activeTypes.length > 1) {
            let i = this.activeTypes.indexOf(this.label.toLowerCase())
            let a = deepCopy(this.activeTypes)
            a.splice(i, 1)
            return '/media/' + a.join('-')
          }
          return '/media/'
        }
        if (this.activeTypes) {
          return '/media/' + this.label.toLowerCase() + '-' + this.activeTypes.join('-')
        }
        return '/media/' + this.label.toLowerCase()
      }
    },
    props: ['label', 'icon', 'activeTypes']
  }

</script>

<style>
  .filterToggle {
    display: inline-block;
  }

  .imgWrap {
    width: 50px;
    height: 50px;
    margin: auto;
    padding: 10px;
    border-radius: 24px;
    border: 1px solid #797979;
  }

  .imgWrap img {
    margin: auto;
    width: 30px;
    height: 30px;
  }

  .active {
    background-color: #92b4c6;
  }

  .notActive {
    background-color: transparent;
  }
</style>
