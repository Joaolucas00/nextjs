import nookies from 'nookies'

const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN_NAME'

const controllers = {
    storeRefreshToken: async (req, res) => {
        const ctx = { req, res}

        console.log('handler', req.body);

        nookies.set(ctx, REFRESH_TOKEN_NAME, req.body.refresh_token, {
            httpOnly: true,
            sameSite: 'lax',
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
    }
}

const controllerBy = {
    POST: controllers.storeRefreshToken,
    GET: controllers.displayCookies
}

export default function handler(req, res) {
    if(controllerBy[req.method]) return controllerBy[req.method](req, res)
    
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
}