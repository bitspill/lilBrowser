<template>
  <div class="mediaList">
    <div>
      <div class="type-icon text-center">
        <filter-toggle :activeTypes="types" label="All" icon="media"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Movies" icon="movie"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Videos" icon="video"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Music" icon="album"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Podcasts" icon="podcast"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Books" icon="book"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Recipes" icon="recipe"></filter-toggle>
        <filter-toggle :activeTypes="types" label="Things" icon="things"></filter-toggle>
      </div>
    </div>
    <div class="list">
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
  import FilterToggle from 'components/FilterToggle.vue'

  export default {
    data () {
      return {}
    },
    components: {
      MediaListItem,
      FilterToggle
    },
    computed: {
      sortedMedia: function () {
        let dc = deepCopy(this.mediaItems)
        return dc.sort(function (a, b) {
          let tsa = getTimestamp(a)
          let tsb = getTimestamp(b)
          return tsb - tsa
        })
      },
      typeFilteredMedia: function () {
        if (Array.isArray(this.types) && this.types.length > 0) {
          let vm = this
          return this.sortedMedia.filter(function (m) {
            let t = getType(m)
            if (t[t.length] !== 's' && t !== 'music') {
              t = t + 's'
            }
            return vm.types.includes(t)
          })
        }
        return this.sortedMedia
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

  function getTimestamp (m) {
    let ts = 0
    if (m['media-data'] !== undefined) {
      let amb = m['media-data']['alexandria-media']
      if (amb !== undefined) {
        ts = amb.timestamp
      }
    }
    if (m['oip-041'] !== undefined) {
      ts = m['oip-041'].artifact.timestamp
    }
    if (ts >= 10000000000) {
      ts = ts / 1000
    }
    return ts
  }
</script>

<style>
  .mediaList {
    width: 80%;
    margin: auto;
  }
</style>
