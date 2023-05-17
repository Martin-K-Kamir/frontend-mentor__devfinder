import View from './View.js';
import messageView from './messageView.js';
import userView from './userView.js';

class UserHistoryView extends View {
    _parentElement = document.getElementById('history');
    _renderElement = document.querySelector('#user-bookmarks > div');

    handleRemoveLastClick(handler) {
        this._parentElement.addEventListener('click', e => {
            const btn = e.target.closest('.btn');
            const list = e.target.closest('#bookmarks-list');

            if (!btn || btn.dataset.handle !== 'bookmark' || !list && list.childElementCount !== 1) return;

            handler();

            messageView.render({
                message: 'You have no bookmarks left.',
                type: 'default'
            });
        });
    }

    handleRemoveClick(handler) {
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

    _generateMarkupUser(user) {
        return `
            <li class="direction-row justify-content-between align-items-center">
                <a href="${user.username}">${user.username}</a>
                <div class="flow direction-row align-items-center">
                    <span>${user.date}</span>
                    <button class="btn" data-type="secondary" data-handle="remove">
                        <span class="sr-only">remove</span>                    
                        <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                            <use href="/assets/icons/icons.svg#close"></use>
                        </svg>
                    </button>
                </div>
            </li>
        `;
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
                <ul role="list" class="[ table ] [ flow ] [ bg-primary-1 clr-secondary-1 radius-2 size-fluid-3 ]">
                    ${[...this._data].reverse().map(this._generateMarkupUser).join('')}
                </ul>
            </div>
        `
    }
}

export default new UserHistoryView();