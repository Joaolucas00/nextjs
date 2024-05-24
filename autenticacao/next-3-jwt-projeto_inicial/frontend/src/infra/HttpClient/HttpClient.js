export async function HttpClient(fetchUrl, fetchOptions) {
    return fetch(fetchUrl, fetchOptions)
        .then(async (res) => {
            return {
                ok: res.ok,
                body: await res.json()
            }
        });
}