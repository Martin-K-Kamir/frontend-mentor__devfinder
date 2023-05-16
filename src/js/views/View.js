export default class View {
    _data;

    render(data, getMarkup = false) {
        if (!data || (Array.isArray(data) && data.length === 0)) return;

        this._data = data;
        const markup = this._generateMarkup();

        if (getMarkup) return markup;

        this.clear();
        (this._renderElement ?? this._parentElement).insertAdjacentHTML('afterbegin', markup);
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

    clear() {
        (this._renderElement ?? this._parentElement).innerHTML = '';
    }

    animateReveal(show = true) {
        this._parentElement.classList.add('animate');
        this._parentElement.setAttribute('data-animate-height', "");
        this._parentElement.setAttribute('data-animate-opacity', "");

        if (show) {
            setTimeout(() => {
                this._parentElement.setAttribute('data-animating', "");
                const height = this._renderElement.getBoundingClientRect().height;
                this._parentElement.style.setProperty('--animate-height', `${Math.round((height + 50) / 16)}rem`);
                this._parentElement.style.setProperty('--animate-opacity', '1');
            }, 50);
        }

        if(!show) {
            setTimeout(() => {
                this._parentElement.style.setProperty('--animate-height', '0');
                this._parentElement.style.setProperty('--animate-opacity', '0');
            }, 50);
        }
    }

    animateFade(show = true) {
        this._parentElement.classList.add('animate');
        this._parentElement.setAttribute('data-animate-opacity', "");
        this._parentElement.setAttribute('data-animating', "");

        if (show) {
            setTimeout(() => {
                this._parentElement.style.setProperty('--animate-opacity', '1');
            }, 50);
        }

        if (!show) {
            setTimeout(() => {
                this._parentElement.style.setProperty('--animate-opacity', '0');
            }, 50);
        }
    }
}