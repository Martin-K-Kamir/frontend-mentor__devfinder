import * as model from './model.js';
import userView from './views/userView.js';
import searchView from './views/searchView.js';
import messageView from './views/messageView.js';
import {getBookmarks, getHistory, state} from './model.js';

async function controlLoadingUser() {
    try {
        const locationId = window.location.hash.slice(1) || null;

        const data = await model.getUserData(locationId ?? model.state.query);

        const userObj = model.getUserObject(data)

        model.state.set({user: userObj});

        model.state.set({query: locationId ?? model.state.query});

        userView.render(model.state.user);

        window.history.pushState(null, '', `#${model.state.user.userName}`);

        controlUserHistory();

        console.log('controlLoadingUser', model.state);
    } catch (err) {

        if (err.status === 404) {
            messageView.render({
                message: 'User not found',
                type: 'error',
            })
        }

        if (err.message === 'timeout') {
            messageView.render({
                message: 'Your request took too long. Please try again later!',
                type: 'error',
            })
        }

        userView.renderMessage(':(')
    }
}

async function controlSearchingUser() {
    if (messageView.timerId) clearTimeout(messageView.timerId);

    messageView.timerId = setTimeout(() => {
        messageView.renderLoader('Searching')
    }, 1500)

    try {
        const query = searchView.getQuery();
        if (!query) return;

        model.state.set({query: query});

        const data = await model.getUserData(query);

        clearTimeout(messageView.timerId);

        messageView.hide();

        const userObj = model.getUserObject(data)

        model.state.set({user: userObj});

        userView.render(model.state.user);

        window.history.pushState(null, '', `#${model.state.user.userName}`);

        controlUserHistory();

        console.log('controlSearchingUser', model.state)
    } catch (err) {
        if (!navigator.onLine) {
            messageView.render({
                message: 'You are offline. Please check your internet connection! <br> In the meantime, you can check the history of your previous searches or bookmarked users.',
                type: 'error',
            })
        }

        if (err.status === 404) {
            messageView.render({
                message: 'User not found',
                type: 'error',
            })
        }

        if (err.status === 403) {
            messageView.render({
                message: 'API rate limit exceeded',
                type: 'error',
            })
        }

        if (err.message === 'timeout') {
            messageView.render({
                message: 'Your request took too long. Please try again later!',
                type: 'error',
            })
        }

        clearTimeout(messageView.timerId)
    }
}

function controlUserHistory() {
    model.state.set({history: model.getHistory(model.state.user)});
    model.store('history', model.state.history);
    model.store('query', model.state.query);
}

function controlUserBookmarks(id) {
    model.state.set({bookmarks: getBookmarks(id)});

    if (model.state.user.id === id) {
        model.state.set({user: {...state.user, bookmarked: !state.user.bookmarked}});
        userView.update(model.state.user)
    }

    console.log('controlUserBookmarks', model.state)
}

const init = function () {
    userView.handleLoad(controlLoadingUser)
    userView.handleBookmark(controlUserBookmarks)
    searchView.handleSearch(controlSearchingUser)
};
init();
