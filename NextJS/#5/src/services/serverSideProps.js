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

export async function getProducts(){
    const response = await fetch(
      "https://youtube.oneentry.cloud/api/content/products/page/url/shop?limit=4&offset=0&sortOrder=DESC&sortKey=id",
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
