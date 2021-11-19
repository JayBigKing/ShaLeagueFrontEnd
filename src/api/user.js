import http from '@http/http'
// export const _getUserInfo = (errMsg) => http.GET('/api/auth/adminInfo', {}, errMsg)
export const _getUserInfo = (errMsg) => http.GET('/api/auth/userInfo', {}, errMsg)
