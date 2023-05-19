import * as model from './model.js';
import userView from './views/userView.js';
import userBookmarksView from './views/userBookmarksView.js';
import userHistoryView from './views/userHistoryView.js';
import searchView from './views/searchView.js';
import messageView from './views/messageView.js';
import navigationView from './views/navigationView.js';
import pageLoaderView from './views/pageLoaderView.js';
import {SHOW_INSTALL_PROMPT_LIMIT, SHOW_INSTALL_PROMPT_SEC} from './config.js';

async function controlLoadingUser() {
    try {
        const locationId = window.location.hash.slice(1) || null;

        let data, userObj;

        const historyUserObj = model.state.history.find(user => user.username === locationId)
        if (!historyUserObj) {
            data = await model.getUserData(locationId ?? model.state.query);
            userObj = model.getUserObject(data)
        }

        model.state.set({user: historyUserObj ?? userObj});

        model.state.set({query: locationId ?? model.state.query});

        userView.setId(model.state.user.id);
        userView.render(model.state.user);

        window.history.pushState(null, '', `#${model.state.user.username}`);

        controlUserHistory();
    } catch (err) {
        if (err.message === 'timeout') {
            messageView.render({
                message: 'Your request took too long. Please try again later!',
                type: 'error',
            })
        }

        if (err.status === 404) {
            messageView.render({
                message: 'User not found.',
                type: 'error',
            })
        }

        if (err.status === 403) {
            messageView.render({
                message: 'API rate limit exceeded.',
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

        userView.setId(model.state.user.id);

        userView.render(model.state.user);

        window.history.pushState(null, '', `#${model.state.user.username}`);

        controlUserHistory();
    } catch (err) {
        if (!navigator.onLine) {
            messageView.render({
                message: 'You are offline. Please check your internet connection! <br> In the meantime, you can check the history of your previous searches or bookmarked users.',
                type: 'error',
            })
        }

        if (err.status === 404) {
            messageView.render({
                message: 'User not found.',
                type: 'error',
            })
        }

        if (err.status === 403) {
            messageView.render({
                message: 'API rate limit exceeded.',
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

function controlShowBookmarks() {
    if (model.state.bookmarks.length === 0) {
        messageView.render({
            message: 'You have no bookmarks yet. <br> You can bookmark users by clicking on the bookmark icon in the top right corner.',
            type: 'warning'
        })
        return;
    }

    if (navigationView.historyActive) {
        controlHideHistory();
    }

    window.history.pushState(null, '', ' ');

    navigationView.setActiveBtn('bookmarks', true);

    userBookmarksView.render(model.state.bookmarks);

    userBookmarksView.animateReveal(true);

    if (userView.timerId) clearTimeout(userView.timerId);

    userView.timerId = setTimeout(() => {
        userView.animateFade(false);

        setTimeout(() => {
            userView.clear();
        }, 500)
    }, 30);
}

function controlHideBookmarks() {
    if (!navigationView.bookmarksActive) return;

    navigationView.setActiveBtn('bookmarks', false);

    userBookmarksView.animateReveal(false);
    userView.animateFade(true);

    userView.render(model.state.user);

    window.history.pushState(null, '', `#${model.state.user.username}`);

    if (userBookmarksView.timerId) clearTimeout(userBookmarksView.timerId);

    userBookmarksView.timerId = setTimeout(() => {
        userBookmarksView.clear()
    }, 500)
}

function controlShowHistory() {
    if (model.state.history.length === 0) {
        messageView.render({
            message: 'You have no history yet. <br> You can search for users by typing their username in the search bar.',
            type: 'warning'
        })
        return;
    }

    if (navigationView.bookmarksActive) {
        controlHideBookmarks();
    }

    window.history.pushState(null, '', ' ');

    navigationView.setActiveBtn('history', true);

    userHistoryView.render(model.state.history);

    userHistoryView.animateReveal(true);

    if (userView.timerId) clearTimeout(userView.timerId);

    userView.timerId = setTimeout(() => {
        userView.animateFade(false);

        setTimeout(() => {
            userView.clear();
        }, 500)
    }, 30);
}

function controlHideHistory() {
    if (!navigationView.historyActive) return;

    navigationView.setActiveBtn('history', false);

    userHistoryView.animateReveal(false);
    1
    userView.animateFade(true);

    userView.render(model.state.user);

    window.history.pushState(null, '', `#${model.state.user.username}`);

    if (userHistoryView.timerId) clearTimeout(userHistoryView.timerId);

    userHistoryView.timerId = setTimeout(() => {
        userHistoryView.clear()
    }, 500)
}

function controlUserHistory(id) {
    model.state.set({history: model.getHistory(model.state.user, id)});
    model.store('history', model.state.history);
    model.store('query', model.state.query);
}

function controlUserBookmarks(id) {
    model.state.set({bookmarks: model.getBookmarks(id)});
    model.state.set({user: {...model.state.user, bookmarked: !model.state.user.bookmarked}});

    userView.update(model.state.user);

    model.store('bookmarks', model.state.bookmarks);
}

function controlDeleteBookmarks() {
    model.state.set({bookmarks: [], user: {...model.state.user, bookmarked: false}});
    model.store('bookmarks', model.state.bookmarks);
    messageView.render({
        message: 'Bookmarks deleted.',
        type: 'success'
    });
}

function controlDeleteHistory() {
    model.state.set({history: []});
    model.store('history', model.state.history);
    messageView.render({
        message: 'History deleted.',
        type: 'success'
    });
}

function controlPreferredTheme() {
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const lightTheme = window.matchMedia("(prefers-color-scheme: light)");
    const theme = model.restore('theme');

    if (!theme && darkTheme.matches) {
        navigationView.setTheme('dark');
        model.state.set({theme: 'dark'});
    }

    if (!theme && lightTheme.matches) {
        navigationView.setTheme('light');
        model.state.set({theme: 'light'});
    }

    if (theme && theme === 'dark') {
        navigationView.setTheme('dark');
        model.state.set({theme: 'dark'});
    }

    if (theme && theme === 'light') {
        navigationView.setTheme('light');
        model.state.set({theme: 'light'});
    }

    navigationView.update(model.state.theme);
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
    model.store('theme', model.state.theme);
}

function controlPageLoad() {
    pageLoaderView.animateFade(false);

    pageLoaderView.timerId = setTimeout(() => {
        pageLoaderView.destroy();
    }, 500)
}

function controlInstallPrompt() {
    setTimeout(() => {
        if (model.state.installPromptCount >= SHOW_INSTALL_PROMPT_LIMIT) return;

        model.state.set({installPromptCount: model.state.installPromptCount + 1});

        model.store('installPromptCount', model.state.installPromptCount);

        messageView.render({
            showInstallPrompt: true,
            message: 'Install this app on your device for a better experience.',
        });
    }, SHOW_INSTALL_PROMPT_SEC * 1000);
}

function controlOffline() {
    messageView.render({
        message: 'You are offline. Please check your internet connection! <br> In the meantime, you can check the history of your previous searches or bookmarked users.',
        type: 'warning'
    });
}

function controlOnline() {
    messageView.render({
        message: 'You are online.',
        type: 'success'
    });
}

const init = function () {
    pageLoaderView.handleLoad(controlPageLoad);

    messageView.handleInstallPrompt(controlInstallPrompt);
    messageView.handleUserOffline(controlOffline);
    messageView.handleUserOnline(controlOnline);

    userView.handleLoad(controlLoadingUser);
    userView.handleLoad(controlHideHistory);
    userView.handleBookmarkClick(controlUserBookmarks);

    userHistoryView.handleRemoveLastClick(controlHideHistory);
    userHistoryView.handleRemoveClick(controlUserHistory);
    userHistoryView.handleCloseClick(controlHideHistory);
    userHistoryView.handleDeleteClick(controlDeleteHistory);
    userHistoryView.handleDeleteClick(controlHideHistory);

    userBookmarksView.handleBookmarkLastClick(controlHideBookmarks);
    userBookmarksView.handleBookmarkClick(controlUserBookmarks);
    userBookmarksView.handleCloseClick(controlHideBookmarks);
    userBookmarksView.handleDeleteClick(controlDeleteBookmarks);
    userBookmarksView.handleDeleteClick(controlHideBookmarks);

    searchView.handleSearch(controlSearchingUser);
    searchView.handleSearch(controlHideBookmarks);
    searchView.handleSearch(controlHideHistory);

    navigationView.handleThemeChange(controlPreferredTheme);
    navigationView.handleThemeClick(controlToggleTheme);
    navigationView.handleBookmarksToggle(controlShowBookmarks, controlHideBookmarks);
    navigationView.handleHistoryToggle(controlShowHistory, controlHideHistory);
};
init();