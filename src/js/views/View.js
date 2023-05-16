export default class View {
    _data;

    onClick(handler, handleEvent) {
        this._parentElement.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            if (btn.dataset.handle === handleEvent) {
                handler();
            }
        })
    }

    render(data, getMarkup = false) {
        if (!data || (Array.isArray(data) && data.length === 0)) return;

        this._data = data;
        const markup = this._generateMarkup();

        if (getMarkup) return markup;

        this._clear();
        (this._renderElement ?? this._parentElement).insertAdjacentHTML('afterbegin', markup);

        if (this._parentElement.dataset.animateReveal) {
            const height = this._renderElement.getBoundingClientRect().height;
            this._parentElement.style.setProperty('--max-height', `${Math.round((height + 50) / 16)}rem`);
        }

    }

    update(data) {

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
        (this._renderElement ?? this._parentElement).innerHTML = '';
    }
}