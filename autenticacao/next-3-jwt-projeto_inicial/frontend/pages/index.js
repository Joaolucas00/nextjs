import { useState } from 'react'
import { useRouter } from 'next/router'

export default function HomeScreen() {
  const router = useRouter()
  const [values, setValues] = useState({
    usuario: 'Joao',
    senha: 'MinhaSenha4123'
  })

  const handlerChange = (event) => {
    const fieldValue = event.target.value
    const fieldName = event.target.name
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      }
    })
  }


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault()
        router.push('/auth-page-static')
        router.push('/auth-page-ssr')
      }}>
        <input placeholder="Usuário" name="usuario" value={values.usuario} onChange={handlerChange}/>
        <input placeholder="Senha" name="senha" type="password" value={values.senha} onChange={handlerChange} />
        <div>
          <button>
            Entrar
          </button>
        </div>
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
      </form>
    </div>
  );
}
