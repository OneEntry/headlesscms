import Home from "@/components/Home";
import MainContainer from '@/components/MainContainer';
import { getPages } from "@/services/serverSideProps";

export default function Index({pages}) {
  return (
    <>
      <MainContainer pages={pages}>
        <main>{pages.map((page, index) => {if(page.pageUrl === 'home'){return <Home data={page} key={index}/>}})}</main>
        </MainContainer>
    </>
  );
}

export async function getServerSideProps({req, res}){
  const pages = await getPages();
  return {
    props: {
      pages,
    }
  }
}