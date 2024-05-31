// Arquitetura Hexagonal
// Ports & Adapterts
export async function HttpClient(fetchUrl, fetchOptions) {
    return fetch(fetchUrl, {
        ...fetchOptions,
        headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers
        },
        body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null
    })
    .then(async (res) => {
            return {
                ok: res.ok,
                status: res.status,
                statusText: res.statusText,
                body: await res.json()
            }
        })
    .then(async (res) => {
        if(!fetchOptions.refresh) return res
        if(res.status !== 401) return res
        const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
            method: 'GET'
        })
        console.log("Tem que funcionar", refreshResponse);
        return res
    })
}