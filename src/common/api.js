const common ='http://localhost:3000'
//login
const login = common + '/login/cellphone'
const register = common + '/captcha/sent'
const yzm = common + '/captcha/verify'
const home = 'http://yd.msword.top/getIndexData'
const type = 'http://yd.msword.top/getClassify'
let api ={
    login,
    register,
    yzm,
    home,
    type
}
export default api