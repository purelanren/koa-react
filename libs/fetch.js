import fetch from 'isomorphic-fetch'

export default function (url, option) {
  const finalOption = {
    method: 'get',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (option.data) {
    finalOption.method = 'post'
    finalOption.body = JSON.stringify(option.data)
  }
  return fetch(url, finalOption)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({ json, response })
      }
      if (json instanceof Array) {
        return [].concat(json)
      }
      return Object.assign({}, json)
    })
}
