import {API_TOKEN, TIMEOUT_SEC} from './config.js';
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`timeout`));
        }, s * 1000);
    });
};

export const getJSON = async function (username) {
    try {
        const octokit = new Octokit({auth: API_TOKEN})
        const fetch = octokit.request('GET /users/{username}', {
            username: username,
            headers: {'X-GitHub-Api-Version': '2022-11-28'}
        })

        const res = await Promise.race([fetch, timeout(TIMEOUT_SEC)]);
        if (res.status !== 200) throw new Error(`${res.message} (${res.status})`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

