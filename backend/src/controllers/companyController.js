import pool from '../config/db.js';

export const registerCompany = async (req, res) => {
    const owner_id = req.user.id;

    // Destructure variables from the form data (frontend)
    const {
        company_name,
        description, // This comes from the "About Us" field
        organization_type,
        industry, // This comes from the "Industry Types" field
        team_size,
        founded_date,
        website,
        company_vision,
        contact_phone,
        social_links,
        map_location,
        contact_email,
    } = req.body;

    try {
        // Map frontend data to the ACTUAL database columns
        const newCompanyProfile = await pool.query(
            `INSERT INTO company_profile 
        (owner_id, company_name, about_company, organizations_type, industry_type, team_size, year_of_establishment, company_website, company_vision, headquarter_phone_no, social_links, map_location_url, headquarter_mail_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
            [
                owner_id,
                company_name,
                description, // Mapped to about_company
                organization_type,
                industry, // Mapped to industry_type
                team_size,
                founded_date, // Mapped to year_of_establishment
                website, // Mapped to company_website
                company_vision,
                contact_phone, // Mapped to headquarter_phone_no
                JSON.stringify(social_links),
                map_location, // Mapped to map_location_url
                contact_email // Mapped to headquarter_mail_id
            ]
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


export const getCompanyProfile = async (req, res) => {
    try {
        // The user's ID is available from the authMiddleware
        const owner_id = req.user.id;

        const profile = await pool.query(
            'SELECT * FROM company_profile WHERE owner_id = $1',
            [owner_id]
        );

        // Check if a profile was found
        if (profile.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Company profile not found' });
        }

        res.status(200).json({ success: true, data: profile.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// ... getCompanyProfile function is above this

export const updateCompanyProfile = async (req, res) => {
    try {
        const owner_id = req.user.id;
        const {
            company_name, about_company, organizations_type, industry_type,
            team_size, year_of_establishment, company_website, company_vision,
            headquarter_phone_no, social_links, map_location_url, headquarter_mail_id
        } = req.body;

        const updatedProfile = await pool.query(
            `UPDATE company_profile SET
        company_name = $1, about_company = $2, organizations_type = $3, industry_type = $4,
        team_size = $5, year_of_establishment = $6, company_website = $7, company_vision = $8,
        headquarter_phone_no = $9, social_links = $10, map_location_url = $11, headquarter_mail_id = $12
       WHERE owner_id = $13 RETURNING *`,
            [
                company_name, about_company, organizations_type, industry_type, team_size,
                year_of_establishment, company_website, company_vision, headquarter_phone_no,
                JSON.stringify(social_links), map_location_url, headquarter_mail_id,
                owner_id
            ]
        );

        res.status(200).json({ success: true, message: 'Profile updated successfully', data: updatedProfile.rows[0] });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};