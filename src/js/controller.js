import * as model from './model.js';
import userView from './views/userView.js';
import searchView from './views/searchView.js';

async function controlLoadingUser() {
    try {
        const data = await model.getUserData(model.state.search.query)

        const userObj = model.getUserObject(data)

        model.state.set({user: userObj})

        console.log(model.state)

        userView.render(model.state.user)
    } catch (err) {
        console.error(`💥 controlLoadingUser: ${err} 💥`);
    }
}

async function controlSearchingUser() {
    try {

        const query = searchView.getQuery();
        if (!query) return;

        model.state.set({search: {query}})

        if (userView.timerId) clearTimeout(userView.timerId);

        userView.renderSpinner(true);

        const data = await model.getUserData(query)

        const userObj = model.getUserObject(data)

        model.state.set({user: userObj})

        userView.update(model.state.user)

        console.log(model.state)
    } catch (err) {
        console.error(`💥 controlSearchingUser: ${err} 💥`);

        if (!navigator.onLine) {
            userView.renderError('You are offline. Please check your internet connection. In meantime, you can still search for your favorite users or history of your searches.');
            return;
        }

        if(err.message === 'timeout') {
            userView.renderError('Your request took too long. Please try again.');
            return;
        }

        searchView.renderError();
    }

    clearTimeout(userView.timerId)
}

const init = function () {
    userView.handleLoad(controlLoadingUser)
    searchView.handleSearch(controlSearchingUser)
};
init();
