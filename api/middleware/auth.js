import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = {
  /**
   * Verification of to Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} Token object
   */
  async verifyToken(req, res, next) {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({
        status: 'error',
        error: 'Kindly provide token'
      });
    }
    try {
      const result = await jwt.verify(token, process.env.SECRET);
      req.user = {
        user_id: result.userId,
        email: result.email,
        first_name: result.first_name,
        last_name: result.last_name,
        admin: result.is_admin,
      };
      next();
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Authentication error!'
      });
    }
  }
};

export default auth;
