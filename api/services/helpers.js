import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  /**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  validatePassword(password) {
    if (password.length <= 8 || password === '') {
      return false;
    } return true;
  },

  /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * isEmpty method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
  isEmpty(input) {
    if (input === undefined || input === '') {
      return true;
    }
    if (input.replace(/\s/g, '').length) {
      return false;
    } return true;
  },

  /**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */ 
  empty(input) {
    if (input === undefined || input === '') {
      return true;
    }
  },

  /**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

export default Helper;