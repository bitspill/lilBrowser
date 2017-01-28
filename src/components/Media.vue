<template>
  <div class="text-center">
    <div>
      <br><br><br><br>
    </div>
    <p class="caption">{{types}}</p>
    <div class="center mediaList list item-delimiter">
      <div class="item" v-for="m in filteredMedia">
        <div class="item-content">
          Media {{m.txid}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        mediaItems: []
      }
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
          let vm = this
          return this.mediaItems.filter(function (m) {
            return m.txid.indexOf(vm.searchQuery) !== -1
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
    width 50%
</style>
