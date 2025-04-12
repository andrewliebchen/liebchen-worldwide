export interface CaseStudy {
  id: string;
  title: string;
  videoUrl: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'watch-duty': {
    id: 'watch-duty',
    title: 'Watch Duty Case Study',
    videoUrl: 'https://youtu.be/GoAHRfv6ToY'
  },
  'meta-quest': {
    id: 'meta-quest',
    title: 'Meta Quest Case Study',
    videoUrl: 'https://youtu.be/W3MjL7-RHSw'
  },
  'miri': {
    id: 'miri',
    title: 'Miri Case Study',
    videoUrl: 'https://youtu.be/example' // Update with actual URL
  }
};

export const getCaseStudy = (id: string): CaseStudy | undefined => {
  return CASE_STUDIES[id];
}; 