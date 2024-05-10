import type { NextApiRequest, NextApiResponse } from "next"

export type ResponseData = {
    name: string
}

export default function capturadorDeRequest(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(200).json({name: "João"}) 
}