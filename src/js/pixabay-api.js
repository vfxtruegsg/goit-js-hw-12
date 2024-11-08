import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46841282-5db11f3b406bb735b1a036109';

export async function fetchData(searchQuery, page) {
  try {
    const response = await axios(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        page: page,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data from Pixabay');
  }
}
