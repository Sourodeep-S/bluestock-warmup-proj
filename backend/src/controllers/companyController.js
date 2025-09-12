import pool from '../config/db.js';

export const registerCompany = async (req, res) => {
    // 1. Get the user's ID from the middleware
    const owner_id = req.user.id;

    // 2. Get all the company details from the request body
    const {
        company_name,
        address,
        city,
        state,
        country,
        postal_code,
        website,
        industry,
        description,
    } = req.body;

    try {
        // 3. Insert the new company profile into the database
        const newCompanyProfile = await pool.query(
            `INSERT INTO company_profile (owner_id, company_name, address, city, state, country, postal_code, website, industry, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
            [owner_id, company_name, address, city, state, country, postal_code, website, industry, description]
        );

        res.status(201).json({
            success: true,
            message: 'Company profile created successfully',
            data: { company_id: newCompanyProfile.rows[0].id },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};