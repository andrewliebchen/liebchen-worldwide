export interface CaseStudy {
  id: string;
  title: string;
  videoUrl: string;
  timestamp: string;
  figma: string;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'watch-duty': {
    id: 'watch-duty',
    title: 'Watch Duty Case Study',
    videoUrl: 'https://youtu.be/Ozss6g2cwnk', 
    timestamp: '20:47',
    figma: "https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB-Portfolio-%E2%80%94-Feb-2025?node-id=0-1&p=f&viewport=450%2C4330%2C0.15&t=94n0KezZ49PzYd4k-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=829%3A21552&show-proto-sidebar=1"
  },
  'meta-quest': {
    id: 'meta-quest',
    title: 'Meta Quest Case Study',
    videoUrl: 'https://youtu.be/Ozss6g2cwnk', 
    timestamp: '00:15',
    figma: "https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB-Portfolio-%E2%80%94-Feb-2025?node-id=0-1&p=f&viewport=450%2C4330%2C0.15&t=94n0KezZ49PzYd4k-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=829%3A21549&show-proto-sidebar=1"
  },
  'miri': {
    id: 'miri',
    title: 'Miri Case Study',
    videoUrl: 'https://youtu.be/Ozss6g2cwnk', 
    timestamp: '10:15',
    figma: "https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB-Portfolio-%E2%80%94-Feb-2025?node-id=0-1&p=f&viewport=450%2C4330%2C0.15&t=94n0KezZ49PzYd4k-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=829%3A21551&show-proto-sidebar=1"
  }
};

export const getCaseStudy = (id: string): CaseStudy | undefined => {
  return CASE_STUDIES[id];
}; 