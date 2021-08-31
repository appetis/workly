const headers = {
  Authorization: 'Bearer ' + localStorage.token,
  'My-Custom-Header': 'foobar',
}
console.log('===>', headers)

export default headers
