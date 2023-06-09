import View from './View.js';
class SearchView extends View {
    _parentElement = document.getElementById('search');

    getQuery() {
        const query = this._parentElement.querySelector('input').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentElement.querySelector('input').value = '';
        this._parentElement.querySelector('input').blur();
    }

    handleSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();