// ToDo: do this right and make an actual module, maybe on npm
//       document stuff, proper structure, etc.

let LB = function () {
}

export default new LB()

LB.prototype.deepCopy = function (o) {
  let copy = o, k

  if (o && typeof o === 'object') {
    copy = Object.prototype.toString.call(o) === '[object Array]' ? [] : {}
    for (k in o) {
      if (o.hasOwnProperty(k)) {
        copy[k] = this.deepCopy(o[k])
      }
    }
  }

  return copy
}

LB.prototype.getType = function (m) {
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

LB.prototype.getTimestamp = function (m) {
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

LB.prototype.getTitle = function (m) {
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
  return title
}
