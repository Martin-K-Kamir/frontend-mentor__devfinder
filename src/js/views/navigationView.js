import View from './View.js';

class NavigationView extends View {
    _parentElement = document.getElementById('navigation');
    _bodyElement = document.getElementById('body');
    _btnHistoryActive = false;
    _btnBookmarksActive = false;

    handleBookmarksToggle(handler1, handler2) {
        this._parentElement.addEventListener('click', (e) => {
            const btn= e.target.closest('.btn');
            if (!btn || btn.dataset.handle !== 'bookmarks') return;

            if (!this._btnBookmarksActive) {
                handler1();
                this._btnBookmarksActive = true;
                btn.dataset.state = 'active';
            } else {
                handler2();
                this._btnBookmarksActive = false;
                delete btn.dataset.state;
            }
        });
    }

    handleThemeToggle(handler) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            if (btn.dataset.handle === 'theme') {
                handler();
            }
        });
    }

    handleThemeChange(handler) {
        window.addEventListener('load', handler);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', handler);
    }

    setTheme(theme) {
        this._bodyElement.dataset.theme = theme;
    }

    _generateMarkup() {
        return `
            <ul class="[ flow ] [ size-1 direction-row ]" role="list">
                <li>
                    <button class="btn" data-type="secondary" data-handle="history">
                        <span>history</span>
                        <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                            <use href="/assets/icons/icons.svg#history"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn" data-type="secondary" data-handle="bookmarks">
                        <span>bookmarks</span>
                        <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                            <use href="/assets/icons/icons.svg#bookmarks"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="btn" data-type="secondary" data-handle="theme" aria-label="${this._data === 'light' ? 'dark' : 'light'} theme toggle">
                        <span>${this._data === 'light' ? 'dark' : 'light'}</span>
                        <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true">
                            <use href="/assets/icons/icons.svg#${this._data === 'light' ? 'dark' : 'light'}-theme"/>
                        </svg>
                    </button>
                </li>
            </ul>
        `
    }
}

export default new NavigationView();