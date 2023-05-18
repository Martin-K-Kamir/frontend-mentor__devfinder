import View from './View.js';
class PageLoaderView extends View {
    _parentElement = document.getElementById('page-loader');

    handleLoad(handler) {
        window.addEventListener('load', handler);
    }

    destroy() {
        this._parentElement.remove();
    }
}

export default new PageLoaderView();