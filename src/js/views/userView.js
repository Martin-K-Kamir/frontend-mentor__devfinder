import View from './View.js';
class UserView extends View {
    _parentElement = document.getElementById('user')
    handleLoad(handler) {
        window.addEventListener('load', handler)
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
            <div class="user__header">
                <img  class="user__avatar" src="${this._data.avatar}" alt="" aria-hidden="true">
                <div class="user__info">
                    <h2 class="clr-secondary-2 f-size-fluid-6 fw-bold line-height-1">${this._data.fullName}</h2>
                    <a class="user__username" href="${this._data.url}" target="_blank">${this._data.userName}</a>
                    <p>Joined ${this._data.created}</p>
                </div>
            </div>
            <div class="user__body">
                <p>${this._data.bio ?? 'This profile has no bio.'}</p>

                <ul class="user__stats" role="list">
                    <li>
                        <h3 class="f-size-fluid-1 fw-normal">Repos</h3>
                        <p class="clr-secondary-2 f-size-fluid-5 fw-bold">${this._data.repos}</p>
                    </li>
                    <li>
                        <h3 class="f-size-fluid-1 fw-normal">Followers</h3>
                        <p class="clr-secondary-2 f-size-fluid-5 fw-bold">${this._data.followers}</p>
                    </li>
                    <li>
                        <h3 class="f-size-fluid-1 fw-normal">Following</h3>
                        <p class="clr-secondary-2 f-size-fluid-5 fw-bold">${this._data.following}</p>
                    </li>
                </ul>

                <ul class="[ user__links ] [ clr-secondary-1 ]" role="list">
                    ${this._data.links.map(item => this._generateMarkupLink(item)).join('')}
                </ul>
            </div>
        `
    }

}

export default new UserView();