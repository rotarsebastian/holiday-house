const isAuthenticated = (req, res, next) => {
    try {
      if (req.session.user) next();
        else return res.send({ status: 0, msg: 'User not authorized!'});
    } catch (err) {
        return res.send({ status: 0, msg: 'User not authorized!'});
    }
}

module.exports = { 
    isAuthenticated
}