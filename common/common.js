/**
 * 设置全局请求路径
 */
const BASE_URL = 'http://aiphoto.fjtbkyc.top'
/**
 * api请求封装
 */
export const callApi = (module, action, params) => {
  const token = wx.getStorageSync('token');
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}/${module}/${action}`,
      data: params,
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': token==''?undefined:token
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}