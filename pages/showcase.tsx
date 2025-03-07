import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://www.figma.com/proto/es7jY6yc1YrgRHqOZyovHG/%F0%9F%92%81%E2%80%8D%E2%99%82%EF%B8%8F-Portfolio-%E2%80%94-Feb-2025?page-id=197%3A14820&node-id=197-14899&p=f&viewport=1077%2C639%2C0.1&t=S617ctpS5QDwrdYq-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=197%3A14899&show-proto-sidebar=1',
      permanent: false,
    },
  };
};

export default function Showcase() {
  return null;
} 