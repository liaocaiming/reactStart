import request, { IResponse } from './request';


import { Toast } from 'antd-mobile'

interface IOptions {
  showLoading?: boolean;
}
export function get(url: string, data?: any, options?: IOptions): Promise<IResponse> {
  return new Promise((resolve, reject) => {
    Toast.loading('加载中')
    request.get(url, data, options).then(res => {
      Toast.hide()
      if (res.code == 200) {
        resolve(res)
        return
      }
      if (res.code === 1004) {
        Toast.fail(res && res.message || res.error, 1, () => {
          window.location.hash = '/'
        })
        return
      }

      Toast.fail(res && res.message || res.error)
      reject(res)
    }).catch((err) => {
      Toast.hide()
      reject(err)
    })
  })
}

export function post(url: string, data?: any, options?: IOptions): Promise<IResponse> {
  return new Promise((resolve, reject) => {
    Toast.loading('加载中')
    request.post(url, data, options).then(res => {
      Toast.hide()
      if (res.code == 200) {
        resolve(res)
        return
      }
      Toast.fail(res && res.message)
      reject(res)
    }).catch((err) => {
      Toast.hide()
      reject(err)
    })
  })
}