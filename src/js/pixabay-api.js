import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const KEY = '42589102-bb5462888a4e95731e5ef7933';
const URL = 'https://pixabay.com/api/';
const loader = document.querySelector('.loader');

export function fetchImages(searchRequest) {
  const searchParamObj = {
    key: KEY,
    q: searchRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const searchParams = new URLSearchParams(searchParamObj);

  loader.style.display = 'block';

  return fetch(`${URL}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      loader.style.display = 'none';

      if (data.hits.length === 0) {
        iziToast.error({
          timeout: 3000,
          position: 'topRight',
          message:
            'There are no images matching your search query. Please, enter something else!',
        });
      }
      return data;
    })
    .catch(error => {
      console.error('Error fetching data!', error);
    });
}
