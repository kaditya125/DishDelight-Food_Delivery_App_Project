import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token; // Access the token from the headers
    console.log(token);

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please Log in Again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error 67 from authentication" });
    }
};

export default authMiddleware;
