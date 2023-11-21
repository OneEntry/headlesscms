import Home from "@/components/Home";
import MainContainer from '@/components/MainContainer';
import { getPages, getMenus } from "@/services/serverSideProps";

export default function Index({pages, menus}) {
  return (
    <>
      <MainContainer menus={menus} pages={pages}>
        <main>{pages.map((page, index) => {if(page.pageUrl === 'home'){return <Home data={page} key={index}/>}})}</main>
        </MainContainer>
    </>
  );
}

export async function getServerSideProps({req, res}){
  const pages = await getPages();
  const menus = await getMenus();
  return {
    props: {
      pages,
      menus
    }
  }
}