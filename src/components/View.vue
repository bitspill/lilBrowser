<template>
  <div class="text-center">
    <div>
      <br><br><br><br>
    </div>
    <p class="caption">{{title}}</p>
    <img :src="coverPath">
  </div>
</template>

<script>
  import axios from 'axios'
  import lb from 'lilBrowser'

  export default {
    data () {
      return {
        mediaItems: []
      }
    },
    components: {
    },
    computed: {
      m: function () {
        if (this.mediaItems.length > 0) {
          return this.mediaItems[0]
        }
        else {
          return {}
        }
      },
      title: function () {
        return lb.getTitle(this.m)
      },
      type: function () {
        return lb.getType(this.m)
      },
      txid: function () {
        return this.$route.params.artifactID
      },
      coverPath: function () {
        return lb.getCoverPath(this.m)
      }
    },
    props: [],
    created: function () {
      if (this.txid) {
        const url = 'http://localhost:41289/alexandria/v2/search'
        let vm = this
        axios.post(url, {
          protocol: 'media',
          'search-on': 'txid',
          'search-for': vm.txid,
          'search-like': false
        })
          .then(function (response) {
            vm.mediaItems = response.data.response
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style>
</style>
