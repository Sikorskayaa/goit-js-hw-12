export function createMarkup(arr) {
    return arr.map( ({ downloads,webformatURL, largeImageURL, tags, likes, views, comments} ) => `
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
    <div class="gallery-list">
    <div class="gallery-item"><b>Likes</b> <span>${likes}</span></div>
    <div class="gallery-item"><b>Views</b> <span>${views}</span></div>
    <div class="gallery-item"><b>Comments</b> <span>${comments}</span></div>
    <div class="gallery-item"><b>Downloads</b> <span>${downloads}</span></div>
    </div></a>
      `).join('')
}