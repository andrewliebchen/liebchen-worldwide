import { GetServerSideProps } from 'next';
import { CaseStudyLanding } from '@/src/components/CaseStudyLanding';
import { getCaseStudy } from '@/src/config/caseStudies';

export const getServerSideProps: GetServerSideProps = async () => {
  const caseStudy = getCaseStudy('watch-duty');
  
  if (!caseStudy) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      caseStudy,
    },
  };
};

export default function Showcase({ caseStudy }) {
  return <CaseStudyLanding caseStudy={caseStudy} />;
} 

