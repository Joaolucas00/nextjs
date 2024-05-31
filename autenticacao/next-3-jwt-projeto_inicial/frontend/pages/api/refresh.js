import nookies from 'nookies'
import { HttpClient } from '../../src/infra/HttpClient/HttpClient';
import { tokenService } from '../../src/services/auth/tokenServices';

const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN_NAME'

const controllers = {
    storeRefreshToken: async (req, res) => {
        const ctx = { req, res}

        console.log('handler', req.body);

        nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refresh_token, {
            httpOnly: true,
            sameSite: 'lax', // nenhum subdominio vai ter acesso a esse token
            path: '/'
        })

        res.json({
            data: {
                message: 'Stored with success!'
            }
        })
    },
    displayCookies: async (req, res) => {
        const ctx = { req, res }
        res.json({
            data: {
                cookies: nookies.get(ctx)
            }
        })
    },
    regenerateTokens: async (req, res) => {

        const ctx = { req, res }
        const cookies = nookies.get(ctx)
        const refresh_token = cookies[REFRESH_TOKEN_NAME] || req.body.refresh_token
        console.log('api/refresh [regenerate token]', refresh_token);
        const refreshResponse = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`, {
            method: 'POST',
            body: {
                refresh_token
            }
        })
        if (refreshResponse.ok) {
            nookies.set(ctx, REFRESH_TOKEN_NAME, refreshResponse.body.data.refresh_token, {
                httpOnly: true,
                sameSite: 'lax',
                path: '/'
            })
            tokenService.save(refreshResponse.body.data.access_token, ctx)
            res.status(200).json({
                data: refreshResponse.body.data
            })
        } else {
            res.status(401).json({
                message: 'Não autorizado',
                status: 401,
            })
        }
    }
}

const controllerBy = {
    POST: controllers.storeRefreshToken,
    GET: controllers.regenerateTokens,
    PUT: controllers.regenerateTokens
    //GET: controllers.displayCookies,

}

export default function handler(req, res) {
    if(controllerBy[req.method]) return controllerBy[req.method](req, res)
    
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
}