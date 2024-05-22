import axios from 'axios';

export const request = (q, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '43859237-c6386bdcccc66f068a9509366',
      q,
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: '15',
    },
  });
};
