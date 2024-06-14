import { createContext, useContext } from "react";
import get from 'lodash/get'


const CMSContext = createContext({
    cmsContent: {}
})

export const getCMSContent = (path = '') => {
    const cmsContent = useContext(CMSContext).cmsContent
    if(path === '') return cmsContent
    const output = get(cmsContent, path)
    if(!output) throw new Error(`Não foi possível encontrar a chave: "${path}". Reveja sua query e tente novamente.`)
    return output
}

export default function CMSProvider({ cmsContent, children }) {
    return (
        <CMSContext.Provider value={{ cmsContent }}>
            { children }
        </CMSContext.Provider>
    )
}