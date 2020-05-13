// ====================== IMPORTS ======================
const app = require('express')();
const rateLimit = require('express-rate-limit');

// ====================== IMPLEMENT LIMITER ======================
// const authLimiter = rateLimit({
//     windowMs: 10 * 1000, // 10 seconds
//     max: 1 // limit each ip to 4 req per windowsMs
// });
// ====================== IMPLEMENT USERS LIMITER ======================
app.use('/users/login', rateLimit({ windowMs: 2 * 1000, max: 1 }));
app.use('/users/register', rateLimit({ windowMs: 3 * 1000, max: 1 }));
app.use('/users/recover', rateLimit({ windowMs: 5 * 1000, max: 1 }));
app.use('/users/edit', rateLimit({ windowMs: 5 * 1000, max: 1 }));
app.use('/users/logout', rateLimit({ windowMs: 5 * 1000, max: 1 }));
app.use('/users/checkauth', rateLimit({ windowMs: 5 * 1000, max: 1 }));
app.use('/users/resetpass', rateLimit({ windowMs: 5 * 1000, max: 1 }));
app.use('/users/reset', rateLimit({ windowMs: 5 * 1000, max: 1 }));
app.use('/users/activate', rateLimit({ windowMs: 20 * 1000, max: 1 }));

// ====================== ROUTES ======================
const usersRoute = require(__dirname + '/./api/users');
const propertiesRoute = require(__dirname + '/./api/properties');

// ====================== ADD ROUTES ======================
app.use('/users', usersRoute);
app.use('/properties', propertiesRoute);

module.exports = app;
