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

  /**
     * Get All Trips
     * @param {object} req 
     * @param {object} res 
     * @returns {object} trips array
     */
  async getAllTrips(req, res) {
    const getAllTripsQuery = 'SELECT * FROM trip ORDER BY trip_id DESC';
    try {
      const { rows } = await dbQuery.query(getAllTripsQuery);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'There are currently no trips'
        });
      }
      const trips = rows;
      return res.status(200).json({
        status: 'success',
        data: {
          trips,
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'An error Occured'
      });
    }
  },

  /**
     * cancel A Trip
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return trip cancelled successfully
     */
  async cancelTrip(req, res) {
    const { tripId } = req.params;
    const { is_admin } = req.user;

    if (!is_admin === true) {
      return res.status(400).json({
        status: 'error',
        error: 'Sorry, you are not authorized to cancel a trip'
      });
    }
    const deleteTripQuery = 'DELETE FROM trip WHERE trip_id=$1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteTripQuery, [tripId]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'There is no trip with that id'
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Trip cancelled successfully',
        data: {}
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error'
      });
    }
  },
}

export default Trips;