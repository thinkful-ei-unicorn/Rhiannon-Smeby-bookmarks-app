import store from './store';

/* HTML template generating functions */

const generateStarRating = function (bookmark) {
  let starRating;
  let starChecked = bookmark.rating;
  let starUnchecked = 5 - starChecked;
  const starCheckedHtml = '<i class="fa fa-star"></i>';
  const starUncheckedHtml = '<i class="fa fa-star-o"></i>';
  starRating = starCheckedHtml.repeat(starChecked) + starUncheckedHtml.repeat(starUnchecked);
  return starRating;
};

function generateBookmarkElement(bookmark) {
  let bookmarkRating = generateStarRating(bookmark);
  if (bookmark.rating >= store.storeData.filter) {
    if (bookmark.isExpanded) {
      return `
      <li class="bookmark" data-bookmark-id="${bookmark.id}">
        <div class="bookmark-title" tabindex="0">
          <h2>${bookmark.title}</h2>
          <p>${bookmarkRating}</p>
        </div>
        <div class="bookmark-description">
          <h3>Description</h3>
          ${(bookmark.desc.length === 0) ? '<p>No description.</p>' : `<p>${bookmark.desc}</p>`}
        </div>
        <div class="bookmark-buttons">
          <button class="urlbtn" id='url' onclick="window.open(href='${bookmark.url}')" type="button">Visit Website</button>
          <button class="delete-btn js-delete" type="button">Delete</button>
        </div>
      </li>`;
    } else {
      return `
        <li class="bookmark" data-bookmark-id="${bookmark.id}">
          <div class="bookmark-title" tabindex="0">
            <h2>${bookmark.title}</h2>
            <p>${bookmarkRating}</p>
          </div>
        </li>`;
    }
  }    
}

function generateBookmarks(bookmarkList) {
  let bookmarks = bookmarkList.map(bookmark => generateBookmarkElement(bookmark));
  
  return `<section class="my-bookmarks">
  <div class="bookmark-controls">
    <button type="button" class="btn add-bookmark-btn js-add-new-bookmark">Add Bookmark</button>
    
    <select id="rating-filter" name="rating-filter" class="filter">
      <option selected hidden>Filter By Rating</option>
      <option value="1" ${(store.storeData.filter === '1') ? 'selected' : ''}>1 Star</option>
      <option value="2" ${(store.storeData.filter === '2') ? 'selected' : ''}>2 Stars</option>
      <option value="3" ${(store.storeData.filter === '3') ? 'selected' : ''}>3 Stars</option>
      <option value="4" ${(store.storeData.filter === '4') ? 'selected' : ''}>4 Stars</option>
      <option value="5" ${(store.storeData.filter === '5') ? 'selected' : ''}>5 Stars</option>
    </select>
  </div>
  
  <section>
    <ul class="bookmark-list">
      ${bookmarks.join('')}
    </ul>
  </section>
</section>`;
}

function generateNewBookmarkForm() {
  
  return `<section class="my-bookmarks">
    <h2>Add New Bookmark</h2>
    
    <form action="" class="new-bookmark-form">
      <label for="bookmark-title">Title</label>
      <input id="bookmark-title" name="title" type="text" placeholder="Title">
      <label for="bookmark-url">Url</label>
      <input id="bookmark-url" name="url" type="url" placeholder="http://google.com">
      <label for="bookmark-rating">Rating</label>
      <input id="bookmark-rating" name="rating" type="number" min="1" max="5" placeholder="1">
      <label for="bookmark-desc" for="desc">Description</label>
      <textarea id="bookmark-desc" name="desc" placeholder="Description"></textarea>
      <div class="form-buttons">
        <button type="button" class="btn cancel-btn js-cancel-new-bookmark">Cancel</button>
        <button type="submit" class="btn submit-btn js-add-bookmark">Add Bookmark</button>
      </div>
    </form>
  </section>`;
}

function generateError(message) {
  return `
      <section class="error-message">
        <p>${message}</p>
        <button class="btn" id="close-error">Close</button>
      </section>
    `;
}


export default {
  generateNewBookmarkForm,
  generateBookmarks,
  generateError
};