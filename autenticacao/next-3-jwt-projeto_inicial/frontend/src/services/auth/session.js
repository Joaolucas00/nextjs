import { authService } from "./authServices"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

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


export const useSession = () => {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        authService.getSession()
        .then((res) => {
            setSession(res)
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return {
        data: {
            session
        },
        error,
        loading,
    }
}

export function withSessionHOC(Component) {
    return function Wrapper(props) {
        const session = useSession()
        const rota = useRouter()
        if (!session.loading && session.error) {
            rota.push('/?error=unauthorized&status=401')
        }
        const modifiedProps = {
            ...props,
            session: session.data.session
        }
        return (
            <Component {...modifiedProps} />
        )
    }
}
