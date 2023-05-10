
module.exports = () => {
    return {
        plugins: [
            require('postcss-preset-env'),
            // require('postcss-uncss')({
            //     html: ['index.html'],
            // }),
        ],
    };
};