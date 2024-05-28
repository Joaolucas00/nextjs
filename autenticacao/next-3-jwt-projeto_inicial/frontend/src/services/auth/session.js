import { authService } from "./authServices"

// Decorator Patterne 
export const withSession = (callback) => {
    return async (ctx) => {
        try {
            const session = await authService.getSession(ctx)
            const modifiedContext = {
                ...ctx,
                req: {
                    ...ctx.req,
                    session,
                }
            }
            return callback(modifiedContext)
        } catch (error) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/?error=unauthorized&status=401'
                }
            }
        }
    }
}