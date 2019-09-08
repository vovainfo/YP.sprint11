// webpack.config.js
const path = require('path');
// в константу записали правильный путь, используя модуль path

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
}
// переписали точку выхода, используя абсолютный путь
