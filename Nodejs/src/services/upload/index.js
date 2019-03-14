const imgur = require('imgur')
imgur.setClientId('f0ea04148a54268')

export function uploadFromBinary (binary) {
  let base64 = Buffer.from(binary).toString('base64')
  return imgur.uploadBase64(base64) // Devuelve una promesa
}

export function deleteImage (hash) {
    return imgur.deleteImage(hash)
}