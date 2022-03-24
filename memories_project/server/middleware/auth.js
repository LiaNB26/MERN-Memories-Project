import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isCustomeAuth = token.length < 500;

    let decodedData;

    if (token && isCustomeAuth) {
      decodedData = jwt.verify(token, process.env.SECRET_KEY_JWT);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
