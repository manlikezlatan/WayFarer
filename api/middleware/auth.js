import jwt from 'jsonwebtoken';
import db from '../models/db';

const auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { 
        user_id: decoded.user_id, 
        email: decoded.email,
        first_name: decoded.first_name, 
        last_name: decoded.last_name,
        is_admin: decoded.is_admin, 
      };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default auth;