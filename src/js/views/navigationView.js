import View from './View.js';

class NavigationView extends View {
    _parentElement = document.getElementById('navigation');
    _bodyElement = document.getElementById('body');
    _bookmarkBtn = this._parentElement.querySelector('.btn[data-handle="bookmarks"]');
    _historyBtn = this._parentElement.querySelector('.btn[data-handle="history"]');

    historyActive = false;
    bookmarksActive = false;
    debounceTimer;

    handleHistoryToggle(handler1, handler2) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn || btn.dataset.handle !== 'history') return;
            btn.dataset.state = 'disabled';

            if (!this.historyActive) {
                handler1();
            } else {
                handler2();
            }

            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                btn.dataset.state = 'enabled';
                this.debounceTimer = null;
            }, 500);
        });
    }

    handleBookmarksToggle(handler1, handler2) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn || btn.dataset.handle !== 'bookmarks') return;
            btn.dataset.state = 'disabled';

            if (!this.bookmarksActive) {
                handler1();
            } else {
                handler2();
            }

            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                btn.dataset.state = 'enabled';
                this.debounceTimer = null;
            }, 500);
        });
    }

    handleHistoryClick(handler) {
        this._btnClick(handler, 'history');
    }

    handleBookmarksClick(handler) {
        this._btnClick(handler, 'bookmarks');
    }

    handleThemeClick(handler) {
        this._btnClick(handler, 'theme');
    }

    handleThemeChange(handler) {
        window.addEventListener('load', handler);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', handler);
    }

    setTheme(theme) {
        this._bodyElement.dataset.theme = theme;
    }

    setActiveBtn(btn, isActive) {
        if (btn === 'bookmarks') {
            this.bookmarksActive = isActive;
            this._bookmarkBtn.dataset.active = isActive;
        }

        if (btn === 'history') {
            this.historyActive = isActive;
            this._historyBtn.dataset.active = isActive;
        }
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
                    <button class="btn" data-type="secondary" data-active="${this.bookmarksActive}" data-handle="bookmarks">
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