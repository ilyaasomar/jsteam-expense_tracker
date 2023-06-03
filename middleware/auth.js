// importing json web token for making User session
import jwt from "jsonwebtoken";
// secret Key
const secret = "expense";
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedToken;
    if (!token) {
      return res.status(403).json({ message: "You are not authenticated." });
    }
    decodedToken = jwt.verify(token, secret);
    // console.log(decodedToken);
    req.userId = decodedToken?.userID;
    next();
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export default auth;
