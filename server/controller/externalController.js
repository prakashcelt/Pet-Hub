import pool from '../database.js';

export const getFacilitiesByClinic = async (req, res) => {
  const { clinic_id } = req.params;
  
  if (!clinic_id) {
    return res.status(400).json({ error: 'Clinic ID is required.' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM facilities WHERE clinic_id = $1',
      [clinic_id]
    );

    return res.status(200).json({
      facilities: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get facilities by clinic error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllClinics = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clinics');
    console.log("CELT === GET ALL CLINICS ===");

    return res.status(200).json({
      clinics: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Get all clinics error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};