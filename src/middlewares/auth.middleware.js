import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    let { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: 'required a Token' })
    }
    try {
        let decodedToken = await jwt.verify(authorization, process.env.JWT_SECRET);
        req.id = decodedToken.id;
        req.role = decodedToken.role
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Error while authenticating user', msg: error.message })
    }
}

export const restrictTo = (...roles) => {

    return (req, res, next) => {
        try {
            if (!roles.includes(req.role)) {
            return res.status(403).json({
                message: 'Forbidden: You are not allowed'
            });
        }else{
            next()
        }
        } catch (error) {
            return res.status(500).json({ message: 'Error while restricting', msg: error.message , stack:error.stack })
        }
    }
}