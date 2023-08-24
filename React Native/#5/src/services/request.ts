export const request = async (url: string) => {
  const response = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
