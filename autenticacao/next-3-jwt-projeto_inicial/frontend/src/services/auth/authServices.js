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
            return body
        })
        .then(async ({ data }) => {
            const { refresh_token } = data
            const response = await HttpClient('/api/refresh', {
                method: 'POST',
                body: {
                    refresh_token
                }
            })
            console.log("resposta: ->", response);
        })
    },
    getSession: async (ctx = null) => {
        const token = tokenService.get(ctx)

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            ctx,
            refresh: true
        }).then((res) => {
            if(!res.ok) throw new Error('Não autorizado')
            return res.body.data
        })
    },
}