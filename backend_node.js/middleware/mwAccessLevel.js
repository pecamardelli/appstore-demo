module.exports  = (level) => {
    return (req, res, next) => {
        if(req.user.accessLevel > level)
            return res.status(403).send('Not authorized to perform this operation.');
        next();
    };
};