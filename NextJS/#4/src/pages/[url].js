import { useRouter } from "next/router";
import MainContainer from "@/components/MainContainer";
import { getPages, getMenus } from "@/services/serverSideProps";

export default function Page({pages, menus}){
    const {query} = useRouter();

    return (
      <MainContainer menus={menus} pages={pages}>
        <h1>Page {query.url}</h1>
      </MainContainer>
    );
}

export async function getServerSideProps({ req, res }) {
  const pages = await getPages();
  const menus = await getMenus();

  return {
    props: {
      pages,
      menus
    },
  };
}