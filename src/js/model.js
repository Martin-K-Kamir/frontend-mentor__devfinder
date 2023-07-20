import {getJSON} from './utils.js';
import {API_URL, INIT_USER, HISTORY_LIMIT} from './config.js';
import { registerSW } from "virtual:pwa-register";

class State {
    constructor(initValue) {
        Object.assign(this, initValue)
    }

    set(newValue) {
        Object.assign(this, {...newValue})
    }
}

export const state = new State({
    query: INIT_USER,
    user: {},
    bookmarks: [],
    history: [],
    theme: '',
    installPromptCount: 0,
});

function formatDate(date) {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    return new Intl.DateTimeFormat(navigator.language, options).format(new Date(date)).replaceAll(' ', '');
}

export function getUserObject(data) {
    return {
        id: data.id,
        url: data.html_url,
        username: data.login,
        fullname: data.name,
        bio: data.bio,
        avatar: data.avatar_url,
        created: formatDate(data.created_at),
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        bookmarked: !!state.bookmarks.find(user => user.id === data.id),
        searched: formatDate(new Date()),
        links: [
            {
                icon: 'location',
                content: data.location
            },
            {
                icon: 'website',
                content: data.blog,
                url: data.blog
            },
            {
                icon: 'twitter',
                content: data.twitter_username,
                url: `https://twitter.com/${data.twitter_username}`
            },
            {
                icon: 'company',
                content: data.company,
            },
        ]
    };
}

export async function getUserData(username) {
    try {
        return await getJSON(username);
    } catch (err) {
        throw err;
    }
}

export function getHistory(userObj, id) {
    if (state.history.find(user => user.id === id)) {
        return [...state.history.filter(user => user.id !== id)];
    }

    if (state.history.at(-1)?.id === userObj.id) return [...state.history];

    if (state.history.find(user => user.id === userObj.id)) {
        return [...state.history.filter(user => user.id !== userObj.id), userObj];
    }

    return [...state.history, userObj].slice(-HISTORY_LIMIT);
}

export function getBookmarks(id) {
    if (state.bookmarks.find(user => user.id === id)) {
        return [...state.bookmarks.filter(user => user.id !== id)];
    }

    const bookmarked = state.user.bookmarked ? state.user : {...state.user, bookmarked: true};

    return [...state.bookmarks, bookmarked];
}

export function store(location, data) {
    localStorage.setItem(location, JSON.stringify(data));
    return data;
}

export function restore(location) {
    return JSON.parse(localStorage.getItem(location));
}

export function resetInstallPromptCount() {
    const lastPromptDate = state.lastPromptDate;
    const currentDate = new Date().getTime();

    // If there is no last prompt date or it has been more than 15 days, reset the count
    if (!lastPromptDate || (currentDate - lastPromptDate) > 15 * 24 * 60 * 60 * 1000) {
        state.set({installPromptCount: 0});
    }
}

function init() {
    const bookmarks = restore('bookmarks');
    const history = restore('history');
    const query = restore('query');
    const installPromptCount = restore('installPromptCount');
    const lastPromptDate = restore('lastPromptDate');

    if (bookmarks) state.set({bookmarks});
    if (history) state.set({history});
    if (query) state.set({query});
    if (installPromptCount) state.set({installPromptCount});
    if (lastPromptDate) state.set({lastPromptDate});

    if ("serviceWorker" in navigator) {
        // && !/localhost/.test(window.location)) {
        registerSW();
    }
}
init();
