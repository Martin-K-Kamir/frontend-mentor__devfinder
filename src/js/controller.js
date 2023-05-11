import * as model from './model.js';
import userView from './views/userView.js';

async function controlUsers() {
    try {
        const data = await model.getUserData(model.state.search.user)

        const userObject = model.getUserObject(data)

        model.state.set({user: userObject})

        console.log(model.state)

        userView.render(model.state.user)
    } catch (err) {
        console.error(`💥 ${err} 💥`);
    }
}

const init = function () {
    userView.handleLoad(controlUsers)
};
init();
