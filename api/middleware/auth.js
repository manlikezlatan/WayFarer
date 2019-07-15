import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models/query';

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
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 'error',
        error: 'Kindly provide token'
      });
    }
    try {
      const result = await jwt.verify(token, process.env.SECRET);
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const { rows } = await db.query(query, [result.userId]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'The token you provided is invalid'
        });
      }
      req.user = {
        user_id: result.userId,
        email: rows[0].email,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
        is_admin: rows[0].is_admin,
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
