import { tokenService } from '../src/services/auth/tokenServices'
import nookies from 'nookies'

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

export async function getServerSideProps(ctx) {
    console.log(tokenService.get(ctx));
    const cookies = nookies.get()
    console.log('Cookies: ', cookies);
    return {
        props: {
            token: tokenService.get(ctx)
        }
    }
}

export default AuthPageSSR