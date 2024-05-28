import { useEffect, useState } from "react"
import { authService } from "../src/services/auth/authServices"
import { useRouter } from "next/router"

const useSession = () => {
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




const AuthPageStatic = (props) => {

    const session = useSession()
    const rota = useRouter()

    if (!session.loading && session.error) {
        rota.push('/?error=unauthorized&status=401')
    }

    return (
        <div>
            <h1>Auth Page Static</h1>
        <pre>
            {JSON.stringify(session, null, 2)}
        </pre>
        </div>
    )
}

export default AuthPageStatic