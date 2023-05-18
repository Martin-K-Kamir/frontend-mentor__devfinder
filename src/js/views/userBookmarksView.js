import userView from './userView.js';
import View from './View.js';
import messageView from './messageView.js';

class UserBookmarksView extends View {
    _parentElement = document.getElementById('user-bookmarks');
    _renderElement = document.querySelector('#user-bookmarks > div');


    handleBookmarkLastClick(handler) {
        this._parentElement.addEventListener('click', e => {
            const btn = e.target.closest('.btn');
            const list = e.target.closest('#bookmarks-list');

            console.log(!btn || btn.dataset.handle !== 'bookmark' || !list && list.childElementCount !== 1)
            if (!btn || btn.dataset.handle !== 'bookmark' || !list && list.childElementCount !== 1) return;

            handler();

            messageView.render({
                message: 'You have no bookmarks left.',
                type: 'default'
            });
        });
    }

    handleBookmarkClick(handler) {
        this._parentElement.addEventListener('click', e => {
            const btn = e.target.closest('.btn');
            const user = e.target.closest('.user');
            const list = e.target.closest('#bookmarks-list');

            if (!btn || btn.dataset.handle !== 'bookmark') return;

            handler(+user.dataset.id);

            if (list.childElementCount !== 0) return;

            user.remove();
        });
    }

    handleCloseClick(handler) {
        this._btnClick(handler, 'close');
    }

    handleDeleteClick(handler) {
        this._btnClick(handler, 'delete');
    }

    _generateMarkup() {
        this._parentElement.ariaHidden = false;

        return `
            <div class="[ stack ] [ size-fluid-5 ]">
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
                <ul id="bookmarks-list" class="stack" role="list">
                    ${[...this._data].reverse().map(data => `
                        <li class="[ user ] [ flow ] [ bg-primary-1 d-grid radius-2 size-fluid-7 ]" data-id="${data.id}">
                            ${userView.render(data, true)}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `
    }
}

export default new UserBookmarksView();