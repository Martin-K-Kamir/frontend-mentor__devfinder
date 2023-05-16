import userView from './userView.js';
import View from './View.js';

class UserBookmarksView extends View {
    _parentElement = document.getElementById('user-bookmarks');
    _renderElement = document.querySelector('#user-bookmarks > div');

    handleBookmarkClick(handler) {
        this._parentElement.addEventListener('click',  e => {
            const btn = e.target.closest('.btn');
            const user = e.target.closest('.user');
            if (!btn || btn.dataset.handle !== 'bookmark') return;
            handler(+user.dataset.id);

            user.remove();
        });
    }

    _generateMarkup() {
        this._parentElement.setAttribute('aria-hidden', false);
        this._parentElement.dataset.animateReveal = true;

        return `
            <div class="[ flow ] [ size-1 justify-content-end direction-row ]">
                <button class="btn" data-type="secondary" data-handle="close">
                    <span>close</span>
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                        <use href="/assets/icons/icons.svg#close"/>
                    </svg>
                </button>
                <button class="btn" data-type="secondary" data-handle="delete">
                    <span>delete</span>
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                        <use href="/assets/icons/icons.svg#delete"/>
                    </svg>
                </button>
            </div>
            <ul class="[ flow ] [  ]" role="list">
                ${this._data.reverse().map(data => `
                    <li class="[ user ] [ flow ] [ bg-primary-1 d-grid radius-2 size-fluid-7 ]" data-id="${data.id}">
                        ${userView.render(data, true)}
                    </li>
                `).join('')}
            </ul>
        `
    }
}

export default new UserBookmarksView();