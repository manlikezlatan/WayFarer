import moment from 'moment';
import db from '../models/db';
import Helper from '../services/helpers';

const Users = {
/**
   * Create A User
   * @param {object} req  
   * @param {object} res
   * @returns {object} reflection object 
   */

async signup(req, res) {
  if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) {
    return res.status(400).json({
      status: 'error',
      error: 'Email, password, first name and last name field cannot be empty'
    });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      error: 'Please enter a valid email address'
    });
  }
  if (!Helper.validatePassword(password)) {
    return res.status(400).json({
      status: 'error',
      error: 'Password must be more than eight(8) characters'
    });
  }
  const created_on = moment(new Date());
  const hashedPassword = Helper.hashPassword(req.body.password);

  const createQuery = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
  const values = [
    email,
    first_name,
    last_name,
    hashedPassword,
    created_on,
  ];

  try {
    const { rows } = await db.query(createQuery, values);
    const token = Helper.generateToken(rows[0].id);
    return res.status(201).json({ 
      status: 'success',
      message: 'Account created successfully',
      data: {token}
    });
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).json({
        status: 'error',
        error: 'User with that EMAIL already exist'
      });
    }
    return res.status(400).json({
      status: 'error'
    });
  }
},

/**
 * Signin
 * @param {object} req 
 * @param {object} res
 * @returns {object} user object 
 */

async signin(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 'error',
      error: 'Please enter your email and password'
    });
  }
  if (!Helper.isValidEmail(req.body.email)) {
    return res.status(400).json({
      status: 'error',
      error: 'Please enter a valid email address'
    });
  }
  const signinQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await db.query(signinQuery, [req.body.email]);
    if (!rows[0]) {
      return res.status(400).json({
        status: 'error',
        error: 'The credentials you provided is incorrect'
      });
    }
    if (!Helper.comparePassword(rows[0].password, req.body.password)) {
      return res.status(400).json({
        status: 'error',
        error: 'The password you provided is incorrect'
      });
    }
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).json({ 
      status: 'error',
      data: {token} 
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: 'Unable to process request'
  });
}
}
}

export default Users;