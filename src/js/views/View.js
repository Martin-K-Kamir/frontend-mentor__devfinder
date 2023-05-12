import userView from './userView.js';

export default class View {
    _data;
    _callRender = false;

    timerId = null;

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {

        if(this._callRender) {
            this.render(data);
        }

        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr =>
                    curEl.setAttribute(attr.name, attr.value)
                );
        });
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner(delay = false) {
        if (!navigator.onLine) return;

        const markup = `<span class="spinner"></span>`;

        this.timerId = setTimeout(() => {
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin', markup);
            this._callRender = true;

        }, delay ? 1000 : 0);

    }

    renderError(message = this._errorMessage) {
        if (this._errorElement) {
            this._errorElement.textContent = message;
            this._errorElement.classList.remove('hide');
        }

        if (!this._errorElement) {
            const markup = `
                <p class="clr-error fw-bold" data-type="error">${message}</p>
            `;
            this._clear();
            this._parentElement.insertAdjacentHTML('afterbegin', markup);
        }
    }

    renderMessage(message = this._message) {
        return null;
    }
}