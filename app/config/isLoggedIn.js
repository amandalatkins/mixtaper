// Used to ensure a use is logged in on pages that require it. 
module.exports = function(req, res, next) {
    // If logged in, continue with the request
    if (req.user) {
      return next();
    }
    // If not logged in, redirect to the login page
    return res.redirect("/");
};