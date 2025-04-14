export interface CaseStudy {
  id: string;
  title: string;
  videoUrl: string;
  timestamp: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'watch-duty': {
    id: 'watch-duty',
    title: 'Watch Duty Case Study',
    videoUrl: 'https://youtu.be/Ozss6g2cwnk', // Replace with your single video URL
    timestamp: '20:47'
  },
  'meta-quest': {
    id: 'meta-quest',
    title: 'Meta Quest Case Study',
    videoUrl: 'https://youtu.be/Ozss6g2cwnk', // Replace with your single video URL
    timestamp: '00:15'
  },
  'miri': {
    id: 'miri',
    title: 'Miri Case Study',
    videoUrl: 'https://youtu.be/Ozss6g2cwnk', // Replace with your single video URL
    timestamp: '10:15'
  }
};

export const getCaseStudy = (id: string): CaseStudy | undefined => {
  return CASE_STUDIES[id];
}; 