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
        try {
        const ctx = { req, res }
        const cookies = nookies.get(ctx)
        const refresh_token = cookies[REFRESH_TOKEN_NAME]
        const refreshResponse = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`, {
            method: 'POST',
            body: {
                refresh_token
            }
        })

            nookies.set(ctx, REFRESH_TOKEN_NAME, refreshResponse.body.data.refresh_token, {
                httpOnly: true,
                sameSite: 'lax'
            })
            tokenService.save(refreshResponse.body.data.access_token, ctx)
        
            res.json({
                refreshResponse
            })
        } catch (error) {
            res.json({
                message: 401,
                status: 'Não autorizado',
                error
            })
        }
    }
}

const controllerBy = {
    POST: controllers.storeRefreshToken,
    GET: controllers.regenerateTokens
    //GET: controllers.displayCookies,

}

export default function handler(req, res) {
    if(controllerBy[req.method]) return controllerBy[req.method](req, res)
    
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
}