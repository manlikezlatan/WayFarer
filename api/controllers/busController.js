import moment from 'moment';
import db from '../models/query';
import Helper from '../services/helpers';

const Buses = {
  /**
     * Add A Bus
     * @param {object} req
     * @param {object} res
     * @returns {object} reflection object
     */

  async addBusDetails(req, res) {
    const { number_plate, manufacturer, model, year, capacity } = req.body;

    const { is_admin } = req.user;
    if (!is_admin === true) {
      return res.status(400).json({
        status: 'error',
        error: 'Sorry, you are not authorized to edit or add a bus details'
      });
    }

    const created_on = moment(new Date());

    if (Helper.empty(number_plate) || Helper.empty(manufacturer) || Helper.empty(model) || Helper.empty(year)
      || Helper.empty(capacity)) {
      return res.status(400).json({
        status: 'error',
        error: 'All fields are required'
      });
    }
    const createBusQuery = `INSERT INTO
          bus(number_plate, manufacturer, model, year, capacity, created_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
    const values = [
      number_plate,
      manufacturer,
      model,
      year,
      capacity,
      created_on,
    ];

    try {
      const { rows } = await db.query(createBusQuery, values);
      const busDetails = rows[0];
      return res.status(201).json({
        status: 'success',
        message: 'Bus added successfully',
        data: {
          busDetails
        }
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
      return res.status(400).json({
        status: 'error',
        error: 'Sorry You are unauthorized to view all buses'
      });
    }
    const getAllBusQuery = 'SELECT * FROM bus ORDER BY bus_id DESC';
    try {
      const { rows } = await db.query(getAllBusQuery);
      if (!rows) {
        return res.status(400).json({
          status: 'error',
          error: 'There are no buses'
        });
      }
      const buses = rows;
      return res.status(200).json({
        status: 'success',
        data: { buses }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: 'Sorry, an error occured'
      });
    }
  },
}

export default Buses;