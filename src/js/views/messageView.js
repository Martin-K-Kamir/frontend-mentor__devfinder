import View from './View.js';

class MessageView extends View {
    _parentElement = document.getElementById('message');

    timerId = null;

    constructor() {
        super();

        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            if (btn.dataset.handle === 'close') {
                this.hide();

                if (this.timerId) clearTimeout(this.timerId);
            }
        })
    }

    hide() {
        this._parentElement.dataset.visible = false;
    }

    show(data) {
        this._parentElement.dataset.visible = true;
        this._parentElement.dataset.type = data?.type ?? 'default';
    }

    _generateMarkup() {
        return `
            <div class="[ message__wrapper ] [ flow ] [ size-3 d-flex align-items-center ]">
                <div class="[ message__content ] [ justify-items-center//above-md ]">
                    <p class="fw-bold f-size-4">${this._data.message}</p>
                </div>
                <button class="btn" data-handle="close" data-type="secondary">
                    <span class="sr-only">close</span>
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 24 24">
                        <path fill-rule="nonzero"
                              d="M12.002 2.005c5.518 0 9.998 4.48 9.998 9.997C22 17.52 17.52 22 12.002 22c-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497S7.312 20.5 12.002 20.5s8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722C8.073 9.122 8 8.931 8 8.738c0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                    </svg>
                </button>
            </div>
        `;
    }

    renderLoader(message = 'Loading') {
        const markup = `
            <div class="[ message__wrapper ] [ flow ] [ size-3 d-flex align-items-center ]">
                <div class="[ message__content ] [ justify-items-center//above-md ]">
                    <span class="[ loader ] [ fw-bold f-size-4 ]">${message}</span>
                </div>
                <button class="btn" data-handle="close" data-type="secondary">
                    <span class="sr-only">close</span>
                    <svg class="icon" focusable="false" width="1em" height="1em" aria-hidden="true" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 24 24">
                        <path fill-rule="nonzero"
                              d="M12.002 2.005c5.518 0 9.998 4.48 9.998 9.997C22 17.52 17.52 22 12.002 22c-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497S7.312 20.5 12.002 20.5s8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722C8.073 9.122 8 8.931 8 8.738c0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
                    </svg>
                </button>
            </div>
        `;

        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        this.show();
    }

    render(data) {
        super.render(data);
        this.show(data);
    }

}

export default new MessageView();