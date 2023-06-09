export default class View {
    _data;
    timerId

    _btnClick(handler, handleEvent) {
        this._parentElement.addEventListener('click', e => {
            const btn = e.target.closest('.btn');
            if (!btn || btn.dataset.handle !== handleEvent) return;

            handler(btn);
        });
    }

    render(data, getMarkup = false) {
        if (!data || (Array.isArray(data) && data.length === 0)) return;

        this._data = data;
        const markup = this._generateMarkup();

        if (getMarkup) return markup;

        this.clear();
        (this._renderElement ?? this._parentElement).insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        if (!this._parentElement.hasChildNodes()) return;

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

    clear() {
        (this._renderElement ?? this._parentElement).innerHTML = '';
    }

    animateReveal(show = true) {
        this._parentElement.classList.add('animate');
        this._parentElement.setAttribute('data-animate-height', "");
        this._parentElement.setAttribute('data-animate-opacity', "");

        if (show) {
            this._parentElement.setAttribute('data-animating', "");
            const height = this._renderElement.getBoundingClientRect().height;
            this._parentElement.style.setProperty('--animate-height', `${Math.round((height + 50) / 16)}rem`);
            this._parentElement.style.setProperty('--animate-opacity', '1');
        }

        if (!show) {
            this._parentElement.style.setProperty('--animate-height', '0');
            this._parentElement.style.setProperty('--animate-opacity', '0');
        }
    }

    animateFade(show = true) {
        this._parentElement.classList.add('animate');
        this._parentElement.setAttribute('data-animate-opacity', "");
        this._parentElement.setAttribute('data-animating', "");

        if (show) {
            this._parentElement.style.setProperty('--animate-opacity', '1');
        }

        if (!show) {
            this._parentElement.style.setProperty('--animate-opacity', '0');
        }
    }
}