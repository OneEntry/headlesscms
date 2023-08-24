import { useRouter } from "next/router";
import MainContainer from "@/components/MainContainer";
import { getPages } from "@/services/serverSideProps";

export default function Page({pages}){
    const {query} = useRouter();

    return (
      <MainContainer pages={pages}>
        <h1>Page {query.url}</h1>
      </MainContainer>
    );
}

export async function getServerSideProps({ req, res }) {
  const pages = await getPages();

  return {
    props: {
      pages,
    },
  };
}