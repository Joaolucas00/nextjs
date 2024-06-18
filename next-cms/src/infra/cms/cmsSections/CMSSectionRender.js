import { cmsSections } from "../../../components/cmsSections";
import { getCMSContent } from "../CMSProvider";

export function CMSSectionRender({ pageName }) {
    const section = getCMSContent(`${pageName}.pageContent[0].section`)
    return section.map((sectionProps) => {

        const Component = cmsSections[sectionProps.componentName]

        return (
                <Component key={sectionProps.id} {...sectionProps}/>
        )
    })
}