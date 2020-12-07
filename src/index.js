import $ from 'jquery';
import './styles.css';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';

/* main function runs on page load */

function main() {
  api.getBookmarks()
    .then(bookmarksList => {
      for (let i = 0; i < bookmarksList.length; i++) {
        store.createItem(bookmarksList[i]);
      }
      bookmarks.render();
    });
  bookmarks.eventHandlers();
}

$(main);