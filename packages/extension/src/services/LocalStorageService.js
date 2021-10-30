const LocalStorageService = (function () {
  var _service

  function _getService() {
    if (!_service) {
      _service = this
      return _service
    }
    return _service
  }

  function _setData(name, tokenObj) {
    localStorage.setItem(name, JSON.stringify(tokenObj))
  }

  function _getData(name) {
    return JSON.parse(localStorage.getItem(name))
  }

  function _clearData(name) {
    localStorage.removeItem(name)
  }

  return {
    getService: _getService,
    setData: _setData,
    getData: _getData,
    clearData: _clearData,
  }
})()

export default LocalStorageService
