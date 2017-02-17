<template>
  <div>
    <div>
      <br><br><br><br>
    </div>
    <media-list :mediaItems="mediaItems" :searchQuery="searchQuery"
                :types="types"></media-list>
  </div>
</template>

<script>
  import axios from 'axios'
  import lb from 'lilBrowser'
  import MediaList from 'components/MediaList.vue'

  export default {
    data () {
      return {
        mediaItems: []
      }
    },
    components: {
      MediaList
    },
    props: ['searchQuery'],
    computed: {
      types: function () {
        if (this.$route.params.types !== undefined) {
          return this.$route.params.types.split('-')
        }
        return ''
      }
    },
    created: function () {
      const url = lb.apiBase + '/media/get/all'
      let vm = this
      axios.get(url)
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

<style>
</style>
