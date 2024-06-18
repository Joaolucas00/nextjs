import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { PagehomeHerosectionRecord } from "./PagehomeHerosectionRecord";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
    CommonSeoBlockRecord: (props) => <SEOBlock {...props} />,
    CommonMenuRecord: (props) => <Menu {...props} />,
    PagehomeHerosectionRecord: (props) => <PagehomeHerosectionRecord />,
    CommonFooterRecord: (props) => <Footer {...props}/>
}