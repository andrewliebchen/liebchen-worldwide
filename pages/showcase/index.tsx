import { GetServerSideProps } from 'next';

const URL = 'https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB-Portfolio-%E2%80%94-Feb-2025?node-id=197-14820&p=f&viewport=530%2C655%2C0.1&t=oOOObodCSB0f5O7U-0&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=197%3A14899&show-proto-sidebar=1'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: URL,
      permanent: false,
    },
  };
};

export default function Showcase() {
  return null;
} 