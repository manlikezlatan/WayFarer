import db from '../models/query';

const Buses = {
  /**
     * Add A Bus
     * @param {object} req
     * @param {object} res
     * @returns {object} Bus object
     */

  async addBusDetails(req, res) {
    const {
      number_plate, manufacturer, model, year, capacity
    } = req.body;

    const { is_admin } = req.user;

    if (!is_admin === true) {
      return res.status(401).json({
        status: 'error',
        error: 'Sorry, you are not authorized to edit or add a bus details'
      });
    }
    if (!number_plate || !manufacturer || !model || !year || !capacity) {
      return res.status(400).json({
        status: 'error',
        error: 'Kindly fill the required fields.'
      });
    }
    const createBusQuery = `INSERT INTO
        buses(number_plate, manufacturer, model, year, capacity)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
    const values = [
      number_plate,
      manufacturer,
      model,
      year,
      capacity,
    ];

    try {
      const { rows } = await db.query(createBusQuery, values);
      const data = rows[0];
      return res.status(201).json({
        status: 'success',
        message: 'Bus added successfully',
        data
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        error: 'Unable to add bus'
      });
    }
  },

  /**
     * Get All Buses
     * @param {object} req
     * @param {object} res
     * @returns {object} buses array
     */
  async getAllBuses(req, res) {
    const { is_admin } = req.user;

    if (!is_admin === true) {
      return res.status(401).json({
        status: 'error',
        error: 'Sorry You are unauthorized to view all buses'
      });
    }
    const getAllBusQuery = 'SELECT * FROM buses ORDER BY bus_id ASC';
    try {
      const { rows } = await db.query(getAllBusQuery);
      const data = rows;
      if (!rows) {
        return res.status(400).json({
          status: 'error',
          error: 'There are currently no buses'
        });
      }
      return res.status(200).json({
        status: 'success',
        data
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'An error occured. Try again later'
      });
    }
  },
};

export default Buses;
