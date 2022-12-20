const staffAuthMiddleware = (req, res, next) => {
  
    const {token} = req.body;
    if(token !== 'staff'){
        return res.json(http_formatter(null, 'User not authorized', false));
    }
    next();
}

module.exports = staffAuthMiddleware;