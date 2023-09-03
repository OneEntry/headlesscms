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

export async function getProduct(id: string | number): Promise<Product> {
  return await request(`${projectUrl}/api/content/products/${id}`);
}

export async function getConfig(pageUrl: string): Promise<Config> {
  return await request(`${projectUrl}/api/content/pages/${pageUrl}/config`);
}

export async function getProductsByFilter(data: Filter[], offset: number, limit: number){
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
