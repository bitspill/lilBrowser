<template>
  <div>

    <div class="list mediaList">
      <div class="item" v-for="m in searchFilteredMedia">
        <div class="item-content">
          <media-list-item :m="m"></media-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MediaListItem from 'components/MediaListItem.vue'

  export default {
    data () {
      return {}
    },
    components: {
      MediaListItem
    },
    computed: {
      sortedMedia: function () {
        let dc = deepCopy(this.mediaItems)
        return dc.sort(function (a, b) {
          let tsa = 0, tsb = 0

          if (a['media-data'] !== undefined) {
            let ama = a['media-data']['alexandria-media']
            if (ama !== undefined) {
              tsa = ama.timestamp
            }
          }
          if (a['oip-041'] !== undefined) {
            tsa = a['oip-041'].artifact.timestamp
          }
          if (b['media-data'] !== undefined) {
            let amb = b['media-data']['alexandria-media']
            if (amb !== undefined) {
              tsb = amb.timestamp
            }
          }
          if (b['oip-041'] !== undefined) {
            tsb = b['oip-041'].artifact.timestamp
          }

          if (tsa >= 10000000000) {
            tsa = tsa / 1000
          }
          if (tsb >= 10000000000) {
            tsb = tsb / 1000
          }

          return tsb - tsa
        })
      },
      typeFilteredMedia: function () {
        let vm = this
        return this.sortedMedia.filter(function (m) {
          return vm.types.includes(getType(m))
        })
      },
      searchFilteredMedia: function () {
        if (this.searchQuery) {
          let searchLower = this.searchQuery.toLowerCase()
          return this.typeFilteredMedia.filter(function (m) {
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
        return this.typeFilteredMedia
      }
    },
    props: ['searchQuery', 'mediaItems', 'types']
  }

  function deepCopy (o) {
    let copy = o, k

    if (o && typeof o === 'object') {
      copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {}
      for (k in o) {
        if (o.hasOwnProperty(k)) {
          copy[k] = deepCopy(o[k])
        }
      }
    }

    return copy
  }

  function getType (m) {
    let type = ''
    let am
    if (m['media-data'] !== undefined) {
      am = m['media-data']['alexandria-media']
      if (am !== undefined) {
        type = am.type
      }
    }
    if (m['oip-041'] !== undefined) {
      type = m.type
    }
    return type
  }
</script>

<style>
  .mediaList {
    width: 80%;
    margin: auto;
  }
</style>
