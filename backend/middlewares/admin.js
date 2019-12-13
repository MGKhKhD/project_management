
module.exports = (req, res, next) => {
    if (req.userData && req.userData.role === 'admin') {
        
        next();
    } else {
        res.status(500).json({ message: "Admin role is required"});
    }
}