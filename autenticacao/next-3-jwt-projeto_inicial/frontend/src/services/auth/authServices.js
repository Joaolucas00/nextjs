import { HttpClient } from "../../infra/HttpClient/HttpClient"

export const authService = {
    login: async ({username, password}) => {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: { username, password }
        })
        .then(async (res) => {
            if (!res.ok) throw new Error('Usuário ou senha inválidos!')
            const body = res.body
            console.log('response: ', res)
            console.log('body: ', body);
        })
    },
}