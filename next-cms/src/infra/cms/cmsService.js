export async function cmsService({ query }) {

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
        return body;
    })

    console.log('pageContentResponse', pageContentResponse);

    return {
        data: pageContentResponse
    }
}