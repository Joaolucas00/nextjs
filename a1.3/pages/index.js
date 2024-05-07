import Link from 'next/link'
import { useState } from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/router'

/* prefetch habilitado por padrão, prerecarrega a página*/

function HomePage() {

  const [senha, setSenha] = useState('123456')

  const rota = useRouter()

  return (
    <div>
      Welcome to Next.js!

      <img src="https://github.com/Joaolucas00.png" />

      <ul>
        <li>
          <Link href="/sobre" prefetch={false}> 
            <a>Ir para a /sobre</a>
          </Link>
        </li>
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (senha) {  
          nookies.set(null, 'SENHA_SECRETA', senha, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
          })
          rota.push('/area-logada')
        } else {
          alert('Informe a senha')
        }
      }}>
        <input type='text' onChange={(e) => setSenha(e.target.value)} value={senha}/>
         <button>Submit</button>
      </form>
    </div>
  )
}

export default HomePage


/**
 * 
 *  SSG (next build) [1000 posts]: 27.23 s
 *  ISG (next build) [1000 posts]: 3.10 s
 * 
 */