
const AUTH_KEY = 'vp_auth'
const EXPIRY_HOURS = 24

export const auth = {
    // 设置登录状态
    login() {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify({
            isLogged: true,
            loginTime: Date.now(),
            expiryHours: EXPIRY_HOURS
        }))
    },

    // 清除登录状态
    logout() {
        sessionStorage.removeItem(AUTH_KEY)
    },

    // 检查登录状态及有效期
    check() {
        const authData = this.getAuthData()
        if (!authData) return false

        const isExpired = (Date.now() - authData.loginTime) >
            (authData.expiryHours * 3600000)
        if (isExpired) this.logout()

        return !isExpired && authData.isLogged
    },

    // 获取原始认证数据
    getAuthData() {
        try {
            return JSON.parse(sessionStorage.getItem(AUTH_KEY))
        } catch {
            return null
        }
    }
}
