import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    {
      path: '/',
      component: load('Index'),
      children: [
        { // Default
          path: '',
          component: load('Media')
        },
        {
          path: 'media',
          component: load('Media')
        },
        {
          path: 'media/:types',
          component: load('Media')
        },
        {
          path: 'search/:query',
          component: load('Search')
        },
        {
          path: 'search/:types/:query',
          component: load('Search')
        },
        {
          path: 'publisher',
          component: load('Publisher')
        },
        {
          path: 'publisher/:id',
          component: load('Publisher')
        },
        {
          path: 'publisher/:id/:types',
          component: load('Publisher')
        },
        {
          path: 'view/:id',
          component: load('View')
        }
      ]
    },
    { // Not found
      path: '*',
      component: load('Error404')
    }
  ]
})
