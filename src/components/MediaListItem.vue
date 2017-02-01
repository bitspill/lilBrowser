<template>
  <div>
    <router-link :to="viewRoute">
      <div class="float-left on-left type-icon">
        <img v-if="type=='video'" src="../assets/video-icon.svg"/>
        <img v-if="type=='podcast'" src="../assets/podcast-icon.svg"/>
        <img v-if="type=='thing'" src="../assets/things-icon.svg"/>
        <img v-if="type=='recipe'" src="../assets/recipe-icon.svg"/>
        <img v-if="type=='book'" src="../assets/book-icon.svg"/>
        <img v-if="type=='album'" src="../assets/album-icon.svg"/>
        <img v-if="type=='music'" src="../assets/song-icon.svg"/>
        <img v-if="type=='movie'" src="../assets/movie-icon.svg"/>
      </div>
      <span>{{title}}</span><br>
      <span>
        {{year}}
        • <router-link :to="publisherRoute">{{publisher}}</router-link>
        <span v-if="runtime && (type=='video' || type=='music')">• {{runtime}}</span>
        • {{pubTime}}
      </span>
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
      type () {
        // ToDo: if music type check files array to determine if album
        if (this.oip) {
          return this.m.type
        }
        if (this.am) {
          return this.am.type
        }
        return '<unknown>'
      },
      year () {
        let am = this.am
        if (am !== undefined) {
          return am.info.year
        }
        if (this.oip !== undefined) {
          return this.m.year
        }
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
        if (this.am !== undefined) {
          let mediaInfo = this.am.info
          let mediaRuntime
          if (mediaInfo['extra-info']) {
            if (mediaInfo['extra-info']['runtime']) {
              mediaRuntime = amCalcRuntime(mediaInfo['extra-info']['runtime'])
            }
            else if (mediaInfo['extra-info']['files']) {
              mediaRuntime = amCalcRuntime(mediaInfo['extra-info']['files'][0]['duration'])
            }
          }
          if (mediaRuntime !== undefined && (mediaRuntime !== 0) && (mediaRuntime !== '00:00:undefined')) {
            mediaRuntime = mediaRuntime.split('.')[0]
          }
          else {
            mediaRuntime = ''
          }
          return mediaRuntime
        }
        if (this.oip !== undefined) {
          // ToDo: More intelligently determine duration
          if (this.oip.artifact.storage &&
            this.oip.artifact.storage.files &&
            this.oip.artifact.storage.files[0]) {
            return this.oip.artifact.storage.files[0].duration
          }
        }
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
      viewRoute () {
        return '/view/' + this.m.txid
      },
      publisherRoute () {
        let pubID = this.m.publisher
        if (this.am) {
          pubID = this.am.publisher
        }
        return '/publisher/' + pubID
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

  // CALCULATE RUNTIME FROM SECONDS
  function amCalcRuntime (seconds) {
    let runSecs = seconds
    let runMins = 0
    let runHours = 0
    if (runSecs > 59) {
      runMins = Math.floor(parseInt(seconds) / 60)
      runSecs = runSecs - (runMins * 60)
    }
    if (runSecs < 10) {
      runSecs = '0' + runSecs
    }
    if (runMins > 59) {
      runHours = Math.floor(parseInt(runMins) / 60)
      runMins = runMins - (runHours * 60)
    }
    if (runMins < 10) {
      runMins = '0' + runMins
    }
    if (runHours < 10) {
      runHours = '0' + runHours
    }
    return runHours + ':' + runMins + ':' + runSecs
  }
</script>

<style>
  .type-icon img {
    width: 40px;
    height: 30px;
  }
</style>
