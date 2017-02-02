<template>
  <div class="text-center">
    <div>
      <br><br><br><br>
    </div>
    <p class="caption">{{publisherID}}<span v-if="types"> - {{types}}</span></p>
    <media-list :mediaItems="mediaItems" :searchQuery="searchQuery"
                :types="types"></media-list>
  </div>
</template>

<script>
  import axios from 'axios'
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
    computed: {
      publisherID: function () {
        return this.$route.params.id
      },
      types: function () {
        if (this.$route.params.types !== undefined) {
          return this.$route.params.types.split('-')
        }
        return ''
      }
    },
    props: ['searchQuery'],
    created: function () {
      if (this.publisherID) {
        const url = 'http://localhost:41289/alexandria/v2/search'
        let vm = this
        axios.post(url, {
          protocol: 'media',
          'search-on': 'publisher',
          'search-for': vm.publisherID,
          'search-like': true
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

  // Search for publisher info
  // {"protocol":"publisher","search-on":"address","search-for":"FNa3C96zuEtA5Zra54wkLpMZ6mRvTCo5uG","search-like": true}
  // Publisher info result
  // {"status":"success","response":[{"publisher-data":{"alexandria-publisher":{"name":"Alexandria Demo Publisher","address":"FNa3C96zuEtA5Zra54wkLpMZ6mRvTCo5uG","timestamp":1462071836,"emailmd5":"","bitmessage":""},"signature":"IBcmJAekHAmVUYjINqaMzAoDDUycgjmbk+km02JGIMjrMrYI3Q2dIUooz9b0VNOgUoAWAtpKL5nx/Kw7SSK57j8="},"txid":"9eb37f524a14e7802a8e01d1f55946c71a42d6d5610d5f9b47d504d7ca7c95e5","block":1731579}]}
</script>

<style>
</style>
