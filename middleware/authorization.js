import jwt from 'jsonwebtoken';

const authenticateToken = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({error:"Null token"});
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,user) => {
        if(error) return res.status(403).json({erroe:error.message});
        req.user = user;
        next();
    })
};

export {authenticateToken};