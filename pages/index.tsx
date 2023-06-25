import InfoComponent from "@/components/InfoComponent";
import Wrapper from "@/layout/Wrapper";
import Head from "next/head";

export default function Home() {
  return (
    <Wrapper>
      <Head>
        <title>{` Home || Final-Blog `}</title>
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`Meta description for the Home page`}
        />
      </Head>
      <InfoComponent />
    </Wrapper>
  );
}
