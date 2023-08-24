import { useRouter } from "next/router";
import MainContainer from "@/components/MainContainer";
import { getPages, getMenus, getProducts } from "@/services/serverSideProps";
import Shop from "@/components/Shop";

export default function Page({ pages, menus, data }) {
  const { query } = useRouter();

  return (
    <MainContainer menus={menus} pages={pages}>
      {query.url === "shop" && <Shop data={data} />}
    </MainContainer>
  );
}

export async function getServerSideProps({ req, res }) {
  const pages = await getPages();
  const menus = await getMenus();
  const data = await getProducts();

  return {
    props: {
      pages,
      menus,
      data,
    },
  };
}
