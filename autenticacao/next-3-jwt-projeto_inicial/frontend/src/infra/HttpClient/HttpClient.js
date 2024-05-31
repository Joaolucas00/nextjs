// Arquitetura Hexagonal

import { tokenService } from "../../services/auth/tokenServices";

// Ports & Adapterts
export async function HttpClient(fetchUrl, fetchOptions) {
    const options = {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers
        },
        body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null
    };
    return fetch(fetchUrl, options)
    .then(async (res) => {
            return {
                ok: res.ok,
                status: res.status,
                statusText: res.statusText,
                body: await res.json()
            }
        })
    .then(async (res) => {
        if(!fetchOptions.refresh) return res
        if(res.status !== 401) return res
        // Tenta atualizar os tokens
        const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
            method: 'GET'
        })
        console.log("Tem que funcionar", refreshResponse);
        const newAccessToken = refreshResponse.body.data.access_token
        const newRefreshToken = refreshResponse.body.data.refresh_token

        // salva o token 
        tokenService.save(newAccessToken)

        // Rodar o request anterior
        const retryResponse = await HttpClient(fetchUrl, {
            ...options,
            refresh: false,
            headers: {
                Authorization: `Bearer ${newAccessToken}`
            }
        })

        return retryResponse
    })
}