import { tokenService } from '../src/services/auth/tokenServices'
import nookies from 'nookies'
import { authService } from '../src/services/auth/authServices'
import { redirect } from 'next/dist/server/api-utils'

const AuthPageSSR = (props) => {

    return (
        <div>
            <h1>Auth Page SSR</h1>
        <pre>
            {JSON.stringify(props, null, 2)}
        </pre>
        </div>
    )
}

// Decorator Pattern

export const getServerSideProps = withSession()

/*
export async function getServerSideProps(ctx) {
    try {
        const session = await authService.getSession(ctx)
        return {
            props: {
                session
            }
        }
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: '/?error=unauthorized&status=401'
            }
        }
    }
}*/

export default AuthPageSSR