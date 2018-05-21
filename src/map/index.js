const ak = 'cOWaZxVCM62UdlosYO4hleuQPvWvdT8j';
const getMapScript= function() {
  if (!global.BMap) {
    global.BMap = {}
    global.BMap._preloader = new Promise((resolve, reject) => {
      global._initBaiduMap = function () {
        resolve(global.BMap)
        global.document.head.removeChild($script)
        global.BMap._preloader = null
        global._initBaiduMap = null
      }
      const $script = document.createElement('script')
      global.document.head.appendChild($script)
      $script.src = `https://api.map.baidu.com/api?ak=${ak}&v=2.0&callback=_initBaiduMap`
    });
    return global.BMap._preloader
  } else if (!global.BMap._preloader) {
    return Promise.resolve(global.BMap)
  } else {
    return global.BMap._preloader
  }
};
export default getMapScript
