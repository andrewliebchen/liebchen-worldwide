export interface CaseStudy {
  id: string;
  title: string;
  videoUrl: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'case-1': {
    id: 'case-1',
    title: 'Watch Duty Case Study',
    videoUrl: 'https://youtu.be/GoAHRfv6ToY'
  },
  'case-2': {
    id: 'case-2',
    title: 'Meta Quest Case Study',
    videoUrl: 'https://youtu.be/W3MjL7-RHSw'
  },
  'case-3': {
    id: 'case-3',
    title: 'Miri Case Study',
    videoUrl: '' // To be updated later
  }
};

export const getCaseStudy = (id: string): CaseStudy | undefined => {
  return CASE_STUDIES[id];
}; 