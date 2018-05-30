const proxy = {
    '/api/*': {
        target: 'http://localhost:4261',
        secure: false
    }
};

module.exports = proxy;
