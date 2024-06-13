export async function cmsService({ query }) {

    try {
        const pageContentResponse = await fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + process.env.TOKEN_CMS
            },
            body: JSON.stringify({
                query,
            })
        })
        .then(async (res) => {
            const body = await res.json()
            console.log(body);
            if(!body.errors) return body

            throw new Error(JSON.stringify(body))
        })
    
        return {
            data: pageContentResponse.data
        }
    } catch (error) {
        throw new Error(error.message)
    }


}