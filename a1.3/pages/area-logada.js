import { useRouter } from 'next/router';
import nookies from 'nookies'

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    console.log(cookies);
    const SENHA_SECRETA = '123456'
    const senhaInformada = cookies.SENHA_SECRETA
    const isAutorizado = SENHA_SECRETA === senhaInformada

    if(!isAutorizado) {
        return {
            redirect: {
                permanent: false,
                destination: '/?status=401'
            }
        }
    }

    return {
        props: {
            logado: "Você está logado !!!"
        }
    }

}

export default function AreaLogada({logado}) {
    const rota = useRouter()

    return (
        <div>
            Olá, {logado}
            <button onClick={() => {
                nookies.destroy(null, 'SENHA_SECRETA')
                rota.push('/')
            }}>Voltare</button>
        </div>
    )
}