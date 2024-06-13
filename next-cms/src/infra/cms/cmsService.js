export async function cmsService({ query }) {

    const pageContentResponse = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
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