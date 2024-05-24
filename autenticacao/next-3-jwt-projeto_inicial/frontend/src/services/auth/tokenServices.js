const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

export const tokenService = {
    save: (accessToken) => {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    },
    get: () => {
        return sessionStorage.getItem(ACCESS_TOKEN_KEY)
    },
    delete: () => {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    }
}