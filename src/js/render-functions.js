export const createMarkup = arrSearchPhotos => {
  return arrSearchPhotos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="list-item">
                    <a class="gallery-link" href="${largeImageURL}">
                      <img class="list-img" src="${webformatURL}" alt="${tags}" />
                    </a>
                    <ul>
                      <li>
                        <h3>Likes</h3>
                        <p>${likes}</p>
                      </li>
                      <li>
                        <h3>Views</h3>
                        <p>${views}</p>
                      </li>
                      <li>
                        <h3>Comments</h3>
                        <p>${comments}</p>
                      </li>
                      <li>
                        <h3>Downloads</h3>
                        <p>${downloads}</p>
                      </li>
                    </ul>
                  </li>`;
      }
    )
    .join('');
  
};