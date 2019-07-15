import db from '../models/query';

const Trips = {
  /**
     * Create a Trip
     * @param {object} req
     * @param {object} res
     * @returns {object} Trips object
     */

  async createTrip(req, res) {
    const {
      bus_id, origin, destination, trip_date, fare
    } = req.body;

    const { is_admin } = req.user;

    if (!is_admin === true) {
      return res.status(401).json({
        status: 'error',
        error: 'Sorry, you are not authorized to create a trip'
      });
    }
    if (!bus_id || !origin || !destination || !trip_date || !fare) {
      return res.status(400).json({
        status: 'error',
        error: 'Kindly fill the all required fields'
      });
    }
    const createtripQuery = `INSERT INTO 
        trips(bus_id, origin, destination, trip_date, fare)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
    const values = [
      bus_id,
      origin,
      destination,
      trip_date,
      fare
    ];
    try {
      const { rows } = await db.query(createtripQuery, values);
      const data = rows[0];
      return res.status(201).json({
        status: 'success',
        message: 'Trip created successfully.',
        data
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Unable to create trip'
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
    const deleteTripQuery = 'DELETE FROM trips WHERE trip_id=$1 returning *';
    try {
      const { rows } = await db.query(deleteTripQuery, [tripId]);
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
        status: 'error',
        error: 'An error has occured, try again later'
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
    const getAllTripsQuery = 'SELECT * FROM trips ORDER BY trip_id ASC';
    try {
      const { rows } = await db.query(getAllTripsQuery);
      const data = rows;
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'There are currently no trips'
        });
      }
      return res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'An error Occured, please try again later'
      });
    }
  },
};

export default Trips;
