import {getJSON} from './utils.js';
import {API_URL} from './config.js';

class State {
    constructor(initValue) {
        Object.assign(this, initValue)
    }

    set(newValue) {
        Object.assign(this, {...newValue})
    }
}

export const state = new State({
    search: {
        // user: 'Octocat'
        query: 'Martin-K-Kamir'
    },
    user: {},
    bookmarks: [],
    history: [],
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
    console.log(data)
    return {
        id: data.id,
        url: data.url,
        userName: data.login,
        fullName: data.name,
        bio: data.bio,
        avatar: data.avatar_url,
        created: formatDate(data.created_at),
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
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
        return await getJSON(`${API_URL}/${username}`);
    } catch (err) {
        throw err;
    }
}

function addToHistory(userObj) {
    state.set({history: [...state.history, userObj]})
}