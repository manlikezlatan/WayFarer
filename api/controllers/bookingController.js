import db from '../models/query';

const Bookings = {

  /**
     * Book a trip
     * @param {object} req
     * @param {object} res
     * @returns {object} Bookings object
     */
  async createBooking(req, res) {
    const {
      trip_id, bus_id, trip_date, seat_number
    } = req.body;

    const {
      first_name, last_name, user_id, email,
    } = req.user;

    if (!trip_id) {
      return res.status(400).json({
        status: 'error',
        error: 'Kindly enter a correct trip ID'
      });
    }
    const createBookingQuery = `INSERT INTO
        bookings(user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`;
    const values = [
      user_id,
      trip_id,
      bus_id,
      trip_date,
      seat_number,
      first_name,
      last_name,
      email,
    ];
    try {
      const { rows } = await db.query(createBookingQuery, values);
      const data = rows[0];
      return res.status(201).json({
        status: 'success',
        message: 'Booking successfully created',
        data
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Your preferred seat is taken already, kindly choose another'
        });
      }
      return res.status(500).json({
        status: 'error',
        error: 'An error occured. Kindly try again with correct trip details'
      });
    }
  },

  /**
     * Get All Bookings
     * @param {object} req
     * @param {object} res
     * @returns {object} returns bookings
     */

  async getAllBookings(req, res) {
    const { admin, user_id } = req.user;
    if (!admin === true) {
      const getAllBookingsQuery = 'SELECT * FROM bookings WHERE user_id = $1';
      try {
        const { rows } = await db.query(getAllBookingsQuery, [user_id]);
        if (rows[0] === undefined) {
          return res.status(404).json({
            status: 'error',
            error: 'you have no bookings at the moment'
          });
        }
        const data = rows;
        return res.status(200).json({
          status: 'success',
          data
        });
      } catch (error) {
        return res.status(500).json({
          status: 'error',
          error: 'An error occured. Please try again later'
        });
      }
    }

    // Admin can view all bookings
    const getAllBookingsQuery = 'SELECT * FROM bookings ORDER BY id ASC';
    try {
      const { rows } = await db.query(getAllBookingsQuery);
      if (rows[0] === undefined) {
        return res.status(404).json({
          status: 'error',
          error: 'There are currently no bookings'
        });
      }
      const data = rows;
      return res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'Sorry, an error occured. Please try again later'
      });
    }
  },

  /**
   * Delete booking
   * @param {object} req
   * @param {object} res
   * @returns {void} returns booking deleted
   */
  async deleteBooking(req, res) {
    const { bookingId } = req.params;
    const { user_id } = req.user;
    const deleteBookingQuery = 'DELETE FROM bookings WHERE id = $1 AND user_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteBookingQuery, [bookingId, user_id]);
      console.log(rows);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'You have no booking with the specified booking ID'
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Your booking was deleted successfully',
        data: {}
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'Sorry, an error occured. Try again later'
      });
    }
  },

  /**
 * Update seat number on a booking
 * @param {object} req
 * @param {object} res
 * @returns {object} updated user
 */
  async updateSeat(req, res) {
    const { bookingId } = req.params;
    const { seat_number } = req.body;

    const { user_id } = req.user;

    if (!seat_number) {
      return res.status(400).json({
        status: 'error',
        error: 'Choose a seat number'
      });
    }
    const getBookingQuery = 'SELECT * FROM booking WHERE id=$1';
    const updateBookingSeat = `UPDATE bookings
        SET seat_number=$1 WHERE user_id=$2 AND id=$3 returning *`;
    try {
      const { rows } = await db.query(getBookingQuery, [bookingId]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'This booking cannot be found'
        });
      }
      const values = [
        seat_number,
        user_id,
        bookingId,
      ];
      const result = await db.query(updateBookingSeat, values);
      const data = result.rows[0];
      delete data.seat_number;
      return res.status(200).json({
        status: 'success',
        message: 'Booking updated successfully',
        data
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 'error',
          error: 'Your preferred seat number is already taken. Kindly choose another.'
        });
      }
      return res.status(500).json({
        status: 'error',
        error: 'An error occured'
      });
    }
  },
};

export default Bookings;
