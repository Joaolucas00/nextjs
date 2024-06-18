import { Footer } from "../commons/Footer";
import { Menu } from "../commons/Menu";
import { PageFAQDisplayQuestionsSections } from "./PageFAQDisplayQuestionsSections";
import { PagehomeHerosectionRecord } from "./PagehomeHerosectionRecord";
import { SEOBlock } from "./SeoBlock";

export const cmsSections = {
    CommonSeoBlockRecord: (props) => <SEOBlock {...props} />,
    CommonMenuRecord: (props) => <Menu {...props} />,
    PagehomeHerosectionRecord: (props) => <PagehomeHerosectionRecord {...props} />,
    CommonFooterRecord: (props) => <Footer {...props}/>,
    PagefaqDisplayquestionSectionRecord: (props) => <PageFAQDisplayQuestionsSections {...props}/>
}