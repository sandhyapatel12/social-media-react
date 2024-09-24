const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/socialapp';

const connectTomongo = () =>
{
    mongoose.connect(mongoURL, () =>
    {
        console.log('connected........');
    })
}

module.exports = connectTomongo;
