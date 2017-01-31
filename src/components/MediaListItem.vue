<template>
  <div>
    <router-link :to="linkRoute">
      <div class="float-left on-left"><img src="../assets/video-icon.svg"/></div>
      <span>{{title}}</span><br>
      <span>{{year}} • {{publisher}} • {{runtime}} • {{pubTime}}</span>
    </router-link>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    data () {
      return {}
    },
    props: ['m'],
    computed: {
      year () {
        return '<unknown>'
      },
      publisher () {
        if (this.am !== undefined) {
          return this.m['publisher-name']
        }
        if (this.oip !== undefined) {
          return this.m.publisherName
        }
        return '<unknown>'
      },
      runtime () {
        return '<unknown>'
      },
      pubTime () {
        let am = this.am
        if (am !== undefined) {
          let ts = am.timestamp
          if (ts > 1000000000000) {
            ts = ts / 1000
          }
          return moment.unix(ts).calendar()
        }
        if (this.oip !== undefined) {
          return moment.unix(this.m.timestamp).calendar()
        }
        return '<unknown>'
      },
      title () {
        let oip = this.oip
        let am = this.am
        if (oip !== undefined) {
          return this.m.title
        }
        if (am !== undefined) {
          return am.info.title
        }
        return '<unknown>'
      },
      txid () {
        return this.m.txid
      },
      linkRoute () {
        return '/view/' + this.m.txid
      },
      oip () {
        return this.m['oip-041']
      },
      am () {
        if (this.m['media-data'] !== undefined) {
          return this.m['media-data']['alexandria-media']
        }
        return undefined
      }

    }
  }
</script>

<style>
</style>
