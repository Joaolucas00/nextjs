import { useRouter } from "next/router"
import { tokenService } from "../src/services/auth/tokenServices"
import { useEffect } from "react"
import { HttpClient } from "../src/infra/HttpClient/HttpClient"


export default function LogoutPage() {
    const rota = useRouter()
    useEffect(() => {
        HttpClient('/api/refresh', {
            method: 'DELETE'
        })
        tokenService.delete()
        rota.push('/')
    }, [])
    return (
        <div>
            Você será redirecionado em instantes...
        </div>
    )
}