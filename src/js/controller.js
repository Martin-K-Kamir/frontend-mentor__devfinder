import * as model from './model.js';
import userView from './views/userView.js';
import searchView from './views/searchView.js';
import messageView from './views/messageView.js';
import navigationView from './views/navigationView.js';
import {getBookmarks} from './model.js';

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
        if (err.message === 'timeout') {
            messageView.render({
                message: 'Your request took too long. Please try again later!',
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

        userView.renderMessage(':(')
    }
}

async function controlSearchingUser() {

    try {
        const query = searchView.getQuery();
        if (!query) return;

        if (messageView.timerId) clearTimeout(messageView.timerId);

        messageView.timerId = setTimeout(() => {
            messageView.renderLoader('Searching')
        }, 1500);

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
    model.state.set({bookmarks: model.getBookmarks(id)});

    if (model.state.user.id === id) {
        model.state.set({user: {...model.state.user, bookmarked: !model.state.user.bookmarked}});
        userView.update(model.state.user)
    }

    model.store('bookmarks', model.state.bookmarks);

    console.log('controlUserBookmarks', model.state)
}

function controlPreferredTheme() {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = model.restore('theme');
    console.log('controlPreferredTheme', theme)

    if (theme === 'dark' || darkTheme.matches) {
        navigationView.setTheme('dark');
        model.state.set({theme: 'dark'});
    }

    if (theme === 'light' || !darkTheme.matches) {
        navigationView.setTheme('light');
        model.state.set({theme: 'light'});
    }

    navigationView.update(model.state.theme);
    console.log('controlPreferredTheme', model.state)
}

function controlToggleTheme() {
    if (model.state.theme === 'light') {
        navigationView.setTheme('dark');
        model.state.set({theme: 'dark'});
    } else {
        navigationView.setTheme('light');
        model.state.set({theme: 'light'});
    }

    navigationView.update(model.state.theme);
    console.log('controlToggleTheme', model.state)
}


const init = function () {
    userView.handleLoad(controlLoadingUser)
    userView.handleBookmark(controlUserBookmarks)
    searchView.handleSearch(controlSearchingUser)
    navigationView.handleThemeChange(controlPreferredTheme)
    navigationView.handleThemeToggle(controlToggleTheme)
};
init();
