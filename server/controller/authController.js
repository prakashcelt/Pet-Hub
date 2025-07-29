import pool from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req, res) => {
  console.log('=== SIGNUP REQUEST START ===');
  console.log('Request body:', req.body);
  
  const { name, email, password, mobile, user_roles } = req.body;
  console.log('Extracted fields:', { name, email, password: '***', mobile, user_roles });
  
  if (!name || !email || !password || !mobile) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  try {
    console.log('Checking if user exists with email:', email);
    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('User check result:', userCheck.rows.length > 0 ? 'User exists' : 'User does not exist');
    
    if (userCheck.rows.length > 0) {
      console.log('User already exists, returning 409');
      return res.status(409).json({ error: 'User already exists.' });
    }
    
    console.log('Hashing password...');
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');
    
    console.log('Inserting user into database...');
    // Insert user
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, mobile) VALUES ($1, $2, $3, $4) RETURNING id, name, email, mobile',
      [name, email, password_hash, mobile]
    );
    const user = result.rows[0];
    console.log('User created successfully:', { id: user.id, name: user.name, email: user.email });

    // If user_roles is provided and is an array, assign roles
    if (Array.isArray(user_roles) && user_roles.length > 0) {
      console.log('Processing user roles:', user_roles);
      for (const roleName of user_roles) {
        console.log(`Processing role: ${roleName}`);
        // Get role id from roles table
        const roleRes = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
        if (roleRes.rows.length === 0) {
          console.log(`Role '${roleName}' not found, skipping...`);
          // Optionally, you could create the role if it doesn't exist
          continue; // Skip if role not found
        }
        const role_id = roleRes.rows[0].id;
        console.log(`Found role '${roleName}' with id: ${role_id}`);
        // Insert into user_roles
        await pool.query('INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [user.id, role_id]);
        console.log(`Assigned role '${roleName}' to user ${user.id}`);
      }
    } else {
      console.log('No user roles provided or invalid format');
    }

    console.log('Signup completed successfully');
    console.log('=== SIGNUP REQUEST END ===');
    return res.status(201).json({ user });
  } catch (error) {
    console.error('=== SIGNUP ERROR ===');
    console.error('Signup error:', error);
    console.error('Error stack:', error.stack);
    console.error('=== SIGNUP ERROR END ===');
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const signin = async (req, res) => {
  console.log('=== SIGNIN REQUEST START ===');
  console.log('Request body:', { email: req.body.email, password: '***' });
  
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  
  try {
    console.log('Finding user by email:', email);
    // Find user by email
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('User query result:', userRes.rows.length > 0 ? 'User found' : 'User not found');
    
    if (userRes.rows.length === 0) {
      console.log('Invalid credentials - user not found');
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    
    const user = userRes.rows[0];
    console.log('Found user:', { id: user.id, name: user.name, email: user.email });
    
    console.log('Comparing password...');
    // Compare password
    const match = await bcrypt.compare(password, user.password_hash);
    console.log('Password match result:', match ? 'Password correct' : 'Password incorrect');
    
    if (!match) {
      console.log('Invalid credentials - password mismatch');
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    
    console.log('Fetching user roles...');
    // Get user roles
    const rolesRes = await pool.query(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON ur.role_id = r.id
       WHERE ur.user_id = $1`,
      [user.id]
    );
    const roles = rolesRes.rows.map(r => r.name);
    console.log('User roles found:', roles);
    
    console.log('Generating JWT token...');
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, roles },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('JWT token generated successfully');
    
    const responseData = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        roles
      }
    };
    
    console.log('Signin completed successfully for user:', user.id);
    console.log('=== SIGNIN REQUEST END ===');
    return res.status(200).json(responseData);
  } catch (error) {
    console.error('=== SIGNIN ERROR ===');
    console.error('Signin error:', error);
    console.error('Error stack:', error.stack);
    console.error('=== SIGNIN ERROR END ===');
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const logout = async (req, res) => {
  console.log('=== LOGOUT REQUEST ===');
  console.log('User logged out at:', new Date().toISOString());
  // For stateless JWT, logout is handled on client by deleting token
  // Optionally, you can implement token blacklist here
  return res.status(200).json({ message: 'Logged out successfully.' });
};