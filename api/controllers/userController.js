/* eslint-disable camelcase */
import db from '../models/query';
import Helper from '../services/helpers';

const Users = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} User object
   */

  async signup(req, res) {
    const {
      email, password, first_name, last_name
    } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        status: 'error',
        error: 'Kindly fill your complete details'
      });
    }
    if (!Helper.isValidEmail(email)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid email address'
      });
    }
    if (!Helper.validatePassword(password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid password with more than eight(8) characters'
      });
    }

    const hashedPassword = Helper.hashPassword(password);

    const createQuery = `INSERT INTO
      users(email, first_name, last_name, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [email, first_name, last_name, hashedPassword];

    try {
      const { rows } = await db.query(createQuery, values);
      const id = rows[0].user_id;
      const is_admin = rows[0].is_admin;
      const token = Helper.generateToken(id);
      return res.status(201).json({
        status: 'success',
        message: 'Account created successfully',
        data: {
          id,
          is_admin,
          token
        }
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'User with that email already exist'
        });
      }
      return res.status(500).json({
        status: 'error',
        error: 'Request failed. Try again later.'
      });
    }
  },

  /**
    * Admin Sign Up
    * @param {object} req
    * @param {object} res
    * @returns {object} Admin object
    */

  async AdminSignup(req, res) {
    const {
      email, first_name, last_name, password, is_admin
    } = req.body;

    if (!is_admin === true) {
      return res.status(401).json({
        status: 'error',
        error: 'Unauthorized'
      });
    }

    if (!email || !first_name || !last_name || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Email, password, first name and last name are required'
      });
    }
    if (!Helper.isValidEmail(email)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid email address'
      });
    }
    if (!Helper.validatePassword(password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid password with more than eight(8) characters'
      });
    }
    const hashedPassword = Helper.hashPassword(password);
    const createAdminQuery = `INSERT INTO
      users(email, first_name, last_name, password, is_admin)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      email,
      first_name,
      last_name,
      hashedPassword,
      is_admin,
    ];

    try {
      const { rows } = await db.query(createAdminQuery, values);
      delete rows[0].password;
      const userId = rows[0].user_id;
      const token = Helper.generateToken(rows[0].user_id);
      return res.status(201).json({
        status: 'success',
        message: 'An admin has been created successfully',
        data: {
          userId,
          token
        }
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Admin with that email already exist'
        });
      }
      return res.status(400).json({
        status: 'error',
        error: 'Request failed. Try again later.'
      });
    }
  },

  /**
   * User Sign in
   * @param {object} req
   * @param {object} res
   * @returns {object} User object
   */

  async signin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter your email and password'
      });
    }
    if (!Helper.isValidEmail(email)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid email address'
      });
    }
    const signinQuery = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(signinQuery, [email]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'The email or password you provided is incorrect'
        });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(400).json({
          status: 'error',
          error: 'The password you provided is incorrect'
        });
      }
      const token = Helper.generateToken(rows[0].user_id);
      const id = rows[0].user_id;
      const is_admin = rows[0].is_admin;
      return res.status(200).json({
        status: 'success',
        data: {
          id,
          is_admin,
          token
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'Unable to process request'
      });
    }
  },
};

export default Users;
