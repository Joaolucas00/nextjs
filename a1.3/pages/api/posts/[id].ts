import type { NextApiHandler } from 'next'

export type ResponseData = {
    post: string[] | string
}

const handler: NextApiHandler<ResponseData> = (req, res) => {
    const id = req.query.id
    res.status(200).json({ post: id})
}

export default handler