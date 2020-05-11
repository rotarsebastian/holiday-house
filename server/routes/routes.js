// ====================== IMPORTS ======================
const app = require('express')();
const rateLimit = require('express-rate-limit');

// ====================== IMPLEMENT LIMITER ======================
const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100 // limit each ip to 4 req per windowsMs
});
// app.use('/users', authLimiter);

// ====================== ROUTES ======================
const usersRoute = require(__dirname + '/./api/users');
const playRoute = require(__dirname + '/./api/play');

// ====================== ADD ROUTES ======================
app.use('/users', usersRoute);
app.use('/play', playRoute);

module.exports = app;
