// trying to verify our web token to makae sure a verified user is logged in
const jwt = require("jsonwebtoken");

// Sources:
// https://medium.com/@beaucarnes/learn-the-mern-stack-by-building-an-exercise-tracker-mern-tutorial-59c13c1237a1
// MERN Stack Tutorial with Auth (8 part series):
// https://www.youtube.com/watch?v=4_ZiJGY5F38

// making sure the user is verified
const auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(401).json({msg: "No authentication token, authorization denied."});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({msg: "Token verification failed, authorization denied."});
        }
        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = auth;