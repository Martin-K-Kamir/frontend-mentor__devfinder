# Frontend Mentor - Devfinder

![preview of the site](preview.jpg)

This is a challenge from [Frontend Mentor](https://www.frontendmentor.io/). Coded by [me](https://www.frontendmentor.io/profile/Martin-K-Kamir)! 😁

Welcome to the repository for this project. Feel free to look around and explore! 😀

### Tools

- [Vite](https://vitejs.dev/)
- [SCSS](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)

### Features
- View the optimal layout for the app depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Search for GitHub users by their username.
- See relevant user information based on their search.
- Switch between light and dark themes.
- **Bonus**: Have the correct color scheme chosen for them based on their computer preferences. _Hint_: Research `prefers-color-scheme` in CSS.

I extended the project by incorporating additional features that were not initially outlined in the project brief. Since I completed the core features outlined in the brief relatively early, I decided to introduce these extra functionalities:

- User Bookmarks: Users can now add bookmarks and view them in the dedicated bookmarks section of the application.

- Search History: The application now tracks the user's search history and displays it in a designated section for easy reference.

- Last Search Result: When the user opens the app, the previous search result is automatically loaded, providing a seamless experience.

- Local Storage: I implemented the use of local storage to store the user's bookmarks, search history, and theme preference, ensuring persistent data across sessions.

- Message Notifications: Users are now notified through messages for errors, warnings, success messages, and other important information relevant to their interaction with the app.

- Offline Mode: By utilizing a service worker, the application now includes offline mode functionality, allowing users to access certain features even without an internet connection.

- Progressive Web App (PWA) Support: Users can now install the application on their devices using the Progressive Web App (PWA) functionality, enhancing accessibility and convenience.


### Development
For this project, I initially decided to forgo using React and instead opted for Vanilla JavaScript, implementing the MVC pattern using JavaScript classes. This approach served as a valuable practice, and as the codebase grew, I realized the benefits of using React.

Regarding CSS, I utilized SCSS and adhered to the CUBE methodology to enhance class organization. Over time and through multiple projects, I found myself gravitating towards the use of utility classes. I appreciate how they expedite development and contribute to cleaner code, given that I can reuse these utility classes consistently. However, I noticed that for smaller projects, this approach can result in a larger CSS file. While I experimented with various uncss plugins, I didn't find one that fully met my needs.

Ultimately, I consider this challenge project from Frontend Mentor to be a significant accomplishment. It allowed me to acquire valuable knowledge, and I'm genuinely satisfied with the end result.
### Links

- Live Site URL - [Link](https://devfinder-martinkamir.netlify.app/)
- My website - [Martin Kamír](https://martinkamir.com/)
- Frontend Mentor - [@Martin-K-Kamir](https://www.frontendmentor.io/profile/Martin-K-Kamir)
- Frontend Mentor Solution - [Solution link](https://www.frontendmentor.io/solutions/dine-restaurant-website-pq6hc0PXN9)

Happy coding! 😄