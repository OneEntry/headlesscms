import { useRouter } from "next/router";
import MainContainer from "@/components/MainContainer";
import { getPages, getMenus, getProducts } from "@/services/serverSideProps";
import Shop from "@/components/Shop";

export default function Page({pages, menus, products}){
    const {query} = useRouter();

    return (
      <MainContainer menus={menus} pages={pages}>
        {query.url === "shop" && <Shop products={products}/>}
      </MainContainer>
    );
}

export async function getServerSideProps({ req, res }) {
  const pages = await getPages();
  const menus = await getMenus();
  const products = await getProducts();

  return {
    props: {
      pages,
      menus,
      products
    },
  };
}