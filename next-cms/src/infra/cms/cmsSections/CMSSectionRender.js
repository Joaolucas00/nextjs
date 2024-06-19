import { cmsSections } from "../../../components/cmsSections";
import { getCMSContent } from "../CMSProvider";

export function CMSSectionRender({ pageName }) {
    const section = getCMSContent(`${pageName}.pageContent[0].section`)
    return section.map((sectionProps) => {
        const Component = cmsSections[sectionProps.componentName]
        const isVisible = sectionProps.visible === true || sectionProps.visible === undefined
        
        if(!Component) return null
        if(!isVisible) return null

        return (
            <Component key={sectionProps.id} {...sectionProps}/>
        )
    })
}