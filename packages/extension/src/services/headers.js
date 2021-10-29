const headers = {
  Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('tokens')).accessToken,
  'My-Custom-Header': 'foobar',
}
console.log('===>', headers)

export default headers
