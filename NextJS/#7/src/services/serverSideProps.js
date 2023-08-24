export async function getPages(){
    const response = await fetch(
        "https://youtube.oneentry.cloud/api/content/pages",
        {
            method: 'get',
            headers: {
                Authorization: "Bearer <AUTH_TOKEN>",
                "Content-Type": "application/json",
            },
        }
    );
    return await response.json();
}

export async function getMenus(){
    const response = await fetch(
      "https://youtube.oneentry.cloud/api/content/menus/marker/header",
      {
        method: "get",
        headers: {
          Authorization: "Bearer <AUTH_TOKEN>",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
}

export async function getProducts(page){

    const responseConfig = await fetch(
      `https://youtube.oneentry.cloud/api/content/pages/shop/config`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer <AUTH_TOKEN>",
          "Content-Type": "application/json",
        },
      }
    );

    const config = await responseConfig.json()

    const responseProducts = await fetch(
      `https://youtube.oneentry.cloud/api/content/products/page/url/shop?limit=${config.productsPerRow * config.rowsPerPage}&offset=${page * config.productsPerRow * config.rowsPerPage || 0}&sortOrder=DESC&sortKey=id`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer <AUTH_TOKEN>",
          "Content-Type": "application/json",
        },
      }
    );
    const products = await responseProducts.json()

    return {products, config}
}

export async function getProduct(id){
    const response = await fetch(
      `https://youtube.oneentry.cloud/api/content/products/${id}`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer <AUTH_TOKEN>",
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
}
