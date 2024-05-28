import { withSession } from '../src/services/auth/session'

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

export const getServerSideProps = withSession((ctx) => {
    return {
        props: {
            session: ctx.req.session
        }
    }
})

export default AuthPageSSR