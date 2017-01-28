<template>
  <div class="text-center">
    <div>
      <br><br><br><br>
    </div>
    <p class="caption">{{types}}</p>
    <div class="center mediaList list item-delimiter">
      <div class="item" v-for="m in filteredMedia">
        <div class="item-content">
          <media-list-item :m="m"></media-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import MediaListItem from 'components/MediaListItem.vue'

  export default {
    data () {
      return {
        mediaItems: []
      }
    },
    components: {
      MediaListItem
    },
    computed: {
      types: function () {
        if (this.$route.params.types !== undefined) {
          return this.$route.params.types.split('-')
        }
        return ''
      },
      filteredMedia: function () {
        if (this.searchQuery !== undefined && this.searchQuery !== '') {
          let searchLower = this.searchQuery.toLowerCase()
          return this.mediaItems.filter(function (m) {
            let title = ''
            let am
            if (m['media-data'] !== undefined) {
              am = m['media-data']['alexandria-media']
            }
            if (m['oip-041'] !== undefined) {
              title = m.title
            }
            if (am !== undefined) {
              title = am.info.title
            }
            return title.toLowerCase().indexOf(searchLower) !== -1
          })
        }
        return this.mediaItems
      }
    },
    props: ['searchQuery'],
    created: function () {
      const url = 'http://localhost:41289/alexandria/v2/media/get/all'
      let vm = this
      axios.get(url, {
        params: {
          // ID: 12345
        }
      })
        .then(function (response) {
          vm.mediaItems = response.data
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
</script>

<style lang="styl" rel="stylesheet/stylus">
  .mediaList
    width 80%
</style>
