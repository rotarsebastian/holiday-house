// ====================== IMPORTS ======================
const app = require('express')();
const rateLimit = require('express-rate-limit');

// ====================== IMPLEMENT LIMITER ======================
// const authLimiter = rateLimit({
//     windowMs: 10 * 1000, // 10 seconds
//     max: 1 // limit each ip to 4 req per windowsMs
// });

app.use('/users/login', rateLimit({ windowMs: 2 * 1000, max: 1 }));
app.use('/users/register', rateLimit({ windowMs: 3 * 1000, max: 1 }));
app.use('/users/recover', rateLimit({ windowMs: 5 * 1000, max: 1 }));

// ====================== ROUTES ======================
const usersRoute = require(__dirname + '/./api/users');
const playRoute = require(__dirname + '/./api/play');

// ====================== ADD ROUTES ======================
app.use('/users', usersRoute);
app.use('/play', playRoute);

module.exports = app;
