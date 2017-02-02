<template>
  <div class="list mediaList">
    <div class="item" v-for="m in filteredMedia">
      <div class="item-content">
        <media-list-item :m="m"></media-list-item>
      </div>
    </div>
  </div>
</template>

<script>
  import MediaListItem from 'components/MediaListItem.vue'

  export default {
    data () {
      return {

      }
    },
    components: {
      MediaListItem
    },
    computed: {
      filteredMedia: function () {
        if (this.searchQuery) {
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
    props: ['searchQuery', 'mediaItems']
  }
</script>

<style>
  .mediaList {
    width: 80%;
    margin: auto;
  }
</style>
