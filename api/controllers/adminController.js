import moment from 'moment';
import db from '../models/query';
import Helper from '../services/helpers';

const Admin = {
  /**
     * Create an Admin
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */

  async createAdmin(req, res) {
    const { email, first_name, last_name, password } = req.body;

    const { is_admin } = req.user;

    const isAdmin = true;
    const created_on = moment(new Date());

    if (!is_admin === true) {
      return res.status(400).json({
        status: 'error',
        error: 'Sorry You are unauthorized to create an admin'
      });
    }

    if (Helper.isEmpty(email) || Helper.isEmpty(first_name) || Helper.isEmpty(last_name) || Helper.isEmpty(password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Email, password, first name and last name field cannot be empty'
      });
    }
    if (!Helper.isValidEmail(email)) {
      return res.status(400).json({
        status: 'error',
        error: 'Please enter a valid Email'
      });
    }
    if (!Helper.validatePassword(password)) {
      return res.status(400).json({
        status: 'error',
        error: 'Password must be more than five(5) characters'
      });
    }
    const hashedPassword = Helper.hashPassword(password);
    const createAdminQuery = `INSERT INTO
    users(email, first_name, last_name, password, is_admin, created_on)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
    const values = [
      email,
      first_name,
      last_name,
      hashedPassword,
      isAdmin,
      created_on,
    ];

    try {
      const { rows } = await db.query(createAdminQuery, values);
      delete rows[0].password;
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).json({
        status: 'success',
        message: 'Your admin has been created successful',
        data: { token }
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Admin with that EMAIL already exist'
        });
      }
    }
  },

  /**
   * Update a User to Admin
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated user
   */
  async updateUserToAdmin(req, res) {
    const { id } = req.params;
    const { isAdmin } = req.body;
    const { is_admin } = req.user;

    if (!is_admin === true) {
      return res.status(400).json({
        status: 'error',
        error: 'Sorry, you are not authorized to make a user an admin'
      });
    }
    if (isAdmin === '') {
      return res.status(400).json({
        status: 'error',
        error: 'Admin status is needed'
      });
    }
    const findUserQuery = 'SELECT * FROM users WHERE user_id=$1';
    const updateUser = `UPDATE users SET is_admin=$1 WHERE user_id=$2 returning *`;
    try {
      const { rows } = await db.query(findUserQuery, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'User cannot be found'
        });
      }
      const values = [
        isAdmin,
        id,
      ];
      const response = await db.query(updateUser, values);
      const dbResult = response.rows[0];
      delete dbResult.password;
      return res.status(200).json({
        status: 'status',
        message: 'User updated to admin successfully',
        data: { dbResult }
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Operation was not successful'
      });
    }
  }
}
export default Admin;