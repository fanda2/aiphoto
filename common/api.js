import { callApi } from './common'


/**
 * 小程序用户登录
 */
export const loginApi = ({ loginCode, phoneCode }) => callApi('users', 'Login', { loginCode, phoneCode })
/**
 * 
 * 获取用户信息
 */
export const getUserInfo = () => callApi('users', 'GetUserInfo', {})


