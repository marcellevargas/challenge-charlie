const baseURL = 'http://localhost:3005';

export const BingRequests = async () => {
  const response = await fetch(`${baseURL}/bing/image`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};