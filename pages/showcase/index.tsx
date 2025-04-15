import { GetServerSideProps } from 'next';
import { CaseStudyLanding } from '@/src/components/CaseStudyLanding';
import { getCaseStudy } from '@/src/config/caseStudies';

export const getServerSideProps: GetServerSideProps = async () => {
  const caseStudy = getCaseStudy('root');
  
  if (!caseStudy) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      caseStudy,
      calendlyUrl: 'https://calendly.com/andrew-liebchen/portfolio-review',
    },
  };
};

export default function Showcase({ caseStudy, calendlyUrl }) {
  return <CaseStudyLanding caseStudy={caseStudy} calendlyUrl={calendlyUrl} />;
} 