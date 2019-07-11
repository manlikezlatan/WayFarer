import moment from 'moment';
import db from '../models/query';
import Helper from '../services/helpers';

const Bookings = {

  /**
     * Book a trip
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
  async createBooking(req, res) {
    const { trip_id, bus_id, trip_date, seat_number } = req.body;

    const { first_name, last_name, user_id, email } = req.user;

    const created_on = moment(new Date());

    if (Helper.empty(trip_id) || Helper.empty(bus_id) || Helper.empty(trip_date) || Helper.empty(seat_number)) {
      return res.status(400).json({
        status: 'error',
        error: 'All fields are required'
      });
    }
    const createBookingQuery = `INSERT INTO
        booking(user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, created_on)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      created_on,
    ];

    try {
      const { rows } = await db.query(createBookingQuery, values);
      const bookingDetails = rows[0];
      return res.status(201).json({
        status: 'success',
        message: 'Booking successfully created',
        data: { bookingDetails }
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
        error: 'Unable to create booking'
      });
    }
  },
}

export default Bookings;