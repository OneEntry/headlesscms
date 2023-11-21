import {projectUrl} from '../utils/consts';

export async function request(url: string) {
  const response = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

export async function getProducts(
  pageUrl: string,
  limit: number | string | null,
  offset: number | string | null,
  langCode: string,
): Promise<{items: Product[]; total: number}> {
  return await request(
    `${projectUrl}/api/content/products/page/url/${pageUrl}?offset=${offset}&limit=${limit}&langCode=${langCode}&sortOrder=DESC&sortKey=id`,
  );
}
export async function getPages(langCode: string): Promise<Page[]> {
  return await request(`${projectUrl}/api/content/pages?langCode=${langCode}`);
}
export async function getProduct(
  id: string | number,
): Promise<Product | ErrorPage> {
  return await request(`${projectUrl}/api/content/products/${id}`);
}

export async function getConfig(pageUrl: string): Promise<Config> {
  return await request(`${projectUrl}/api/content/pages/${pageUrl}/config`);
}

export async function getProductsByFilter(
  data: Filter[],
  offset: number,
  limit: number,
) {
  const response = await fetch(
    `${projectUrl}/api/content/products/conditions-filter?offset=${offset}&limit=${limit}&sortOrder=DESC&sortKey=id`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  return await response.json();
}
