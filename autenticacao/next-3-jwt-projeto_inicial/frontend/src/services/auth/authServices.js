import { HttpClient } from "../../infra/HttpClient/HttpClient"
import { tokenService } from "./tokenServices"

export const authService = {
    login: async ({username, password}) => {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: { username, password }
        })
        .then(async (res) => {
            if (!res.ok) throw new Error('Usuário ou senha inválidos!')
            const body = res.body
            tokenService.save(body.data.access_token)
            console.log('response: ', res)
            console.log('body: ', body);
        })
    },
    getSession: async (ctx) => {
        const token = tokenService.get(ctx)

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            if(!res.ok) throw new Error('Não autorizado')
                return res.body.data
        })
    },
}