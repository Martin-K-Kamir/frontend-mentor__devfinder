import View from './View.js';
class UserView extends View {
    _parentElement = document.getElementById('user-view')
    handleLoad(handler) {
        ['load', 'hashchange'].forEach(event => window.addEventListener(event, handler))
    }

    handleBookmarkToggle(handler) {
        this._parentElement.addEventListener('click',  e => {
            const btn = e.target.closest('.btn');
            if (!btn || btn.dataset.handle !== 'bookmark') return;
            handler(+this._parentElement.dataset.id);
        });
    }

    setId(id) {
        this._parentElement.dataset.id = id;
    }

    _generateMarkupLink(item) {
        if (item.url && item.content) {
            return `
                <li>
                    <a class="link" href="${item.url}" target="_blank">
                        <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                            <use href="/assets/icons/icons.svg#${item.icon}"/>
                        </svg>
                        <span>${item.content}</span>
                    </a>
                </li>
            `
        }

        return `
            <li>
                <p class="link" data-disabled="${!item.content ?? false}">
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                        <use href="/assets/icons/icons.svg#${item.icon}"/>
                    </svg>
                    <span>${item.content ?? 'Not Available'}</span>
                </p>
            </li>
        `
    }
    _generateMarkup() {

        return `
            <div class="[ user__header ] [ flow ] [ align-items-center d-flex//below-md ]">
                <img class="[ user__avatar ] [ radius-circle ]" src="${this._data.avatar}" alt="" aria-hidden="true">
                <div class="[ user__info ] [ flow ] [ size-1 ]">
                    <h2 class="clr-secondary-2 f-size-fluid-6 fw-bold line-height-1">${this._data.fullName}</h2>
                    <a class="user__username" href="${this._data.url}" target="_blank">${this._data.userName}</a>
                    <p>Joined ${this._data.created}</p>
                </div>
                <button class="btn" data-handle="bookmark" data-type="secondary">
                    <span class="hide//below-sm" aria-hidden="true">${this._data.bookmarked ? 'pop' : 'push'}</span>
                    <span class="sr-only">${this._data.bookmarked ? 'remove from' : 'add to'} bookmarks</span>
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                        <use href="/assets/icons/icons.svg#${this._data.bookmarked ? 'bookmarked' : 'bookmarks'}"/>
                    </svg>
                </button>
            </div>
            <div class="[ user__body ] [ flow ] [ size-fluid-5 ]">
                <p>${this._data.bio ?? 'This profile has no bio.'}</p>

                <ul class="[ user__stats ] [ bg-primary-2 radius-1 direction-row ]" role="list">
                    <li class="justify-items-center">
                        <h3 class="f-size-fluid-1 fw-normal">Repos</h3>
                        <p class="clr-secondary-2 f-size-fluid-5 fw-bold">${this._data.repos}</p>
                    </li>
                    <li class="justify-items-center">
                        <h3 class="f-size-fluid-1 fw-normal">Followers</h3>
                        <p class="clr-secondary-2 f-size-fluid-5 fw-bold">${this._data.followers}</p>
                    </li>
                    <li class="justify-items-center">
                        <h3 class="f-size-fluid-1 fw-normal">Following</h3>
                        <p class="clr-secondary-2 f-size-fluid-5 fw-bold">${this._data.following}</p>
                    </li>
                </ul>

                <ul class="[ user__links ] [ grid flow ] [ size-content-1 clr-secondary-1 ]" data-initial-size role="list">
                    ${this._data.links.map(item => this._generateMarkupLink(item)).join('')}
                </ul>
            </div>
        `
    }

    renderMessage(message = this._message) {
        const markup = `
            <span class="fw-bold f-size-5 justify-self-center">${message}</span>
        `;

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new UserView();

