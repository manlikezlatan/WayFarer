import moment from 'moment';
import db from '../models/query';
import Helper from '../services/helpers';

const Trips = {
  /**
     * Create a Trip
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */
    
  async createTrip(req, res) {
    const {
      bus_id, origin, destination, trip_date, fare,
    } = req.body;

    const { is_admin } = req.user;
    if (!is_admin === true) {
      return res.status(400).json({
        status: 'error',
        error: 'Sorry, you are not authorized to create a trip'
      });
    }

    const created_on = moment(new Date());

    if (Helper.empty(bus_id) || Helper.isEmpty(origin) || Helper.isEmpty(destination) || Helper.empty(trip_date) || Helper.empty(fare)) {
      return res.status(400).json({
        status: 'error',
        error: 'Origin, Destination, Trip date and Fare, field cannot be empty'
      });
    }
    const createTripQuery = `INSERT INTO
    trip(bus_id, origin, destination, trip_date, fare, created_on)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
    const values = [
      bus_id,
      origin,
      destination,
      trip_date,
      fare,
      created_on,
    ];

    try {
      const { rows } = await db.query(createTripQuery, values);
      if (!rows[0]) {
        return res.status(400).json({
          status: 'error',
          error: 'Please complete the trip details'
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Unable to create trip'
      });
    }
  },
}

export default Trips;