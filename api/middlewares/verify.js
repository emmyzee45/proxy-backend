import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        name: user.username,
        isAdmin: user.isAdmin,
        password: user.password

    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
    } )
}

export const isAuth = (req, res, next) => {
    const token = req.cookies.token; // slice to get rid of Bearer
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY,
            (err, decode) => { 
                // console.log(decode)
                if (err) {
                    res.status(401).json('Invalid Token');
                } else {
                    req.user = decode;
                    next();
                }
            }
        )
    } else {
        res.status(401).json('No Token' );
    }
}