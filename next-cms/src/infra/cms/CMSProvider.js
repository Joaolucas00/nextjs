import { createContext, useContext } from "react";


const CMSContext = createContext({
    cmsContent: {}
})

export const getCMSContent = () => {
    return useContext(CMSContext).cmsContent
}

export default function CMSProvider({ cmsContent, children }) {
    return (
        <CMSContext.Provider value={{ cmsContent }}>
            { children }
        </CMSContext.Provider>
    )
}