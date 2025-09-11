import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
    const { email, password, full_name, gender, mobile_no } = req.body;

    try {
        // Check if user already exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        const newUser = await pool.query(
            `INSERT INTO users (full_name, email, password, gender, mobile_no, signup_type) 
       VALUES ($1, $2, $3, $4, $5, 'e') RETURNING id`,
            [full_name, email, hashedPassword, gender, mobile_no]
        );

        // Send success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please verify mobile OTP.',
            data: { user_id: newUser.rows[0].id },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const user = userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Create JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            'placeholdersecrettokenhere',
            { expiresIn: '90d' },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    token: token,
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};