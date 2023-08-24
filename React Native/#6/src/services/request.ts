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
