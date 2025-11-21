import pool from '../database.js';

export const getBookingsByCustomerId = async (req, res) => {
  const { customer_id } = req.query;
  
  if (!customer_id) {
    return res.status(400).json({ error: 'Customer ID is required.' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE customer_id = $1 ORDER BY created_at DESC',
      [customer_id]
    );

    return res.status(200).json({
      bookings: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get bookings by customer_id error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

