import Home from './home';

export default function Index() {
  return <Home />;
}

// For static optimization, you can export getStaticProps
export async function getStaticProps() {
  return {
    props: {}, // Will be passed to the page component as props
  };
}