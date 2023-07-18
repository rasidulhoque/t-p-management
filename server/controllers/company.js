import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//get all companies
export function getCompanies(req, res) {
    const q = "SELECT username, company_name,company_address, est, email, ph_no, zip_code,company_licence, logo FROM company_register";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

// approve a comapny
export function approve_company(req, res) {
    const { username, status } = req.body;
    const q = `UPDATE company_register SET status = ? WHERE username = ?`;
    db.query(q, [status, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        if (status === 'approved') {
            const q = `INSERT INTO company_details (username, company_name, company_address, est, email, ph_no, zip_code,logo, password) SELECT username, company_name, company_address, est, email, ph_no, zip_code,logo, password FROM company_register WHERE username = ?`;
            db.query(q, [username], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Internal server error');
                }
                const deleteQ = `DELETE FROM company_register WHERE username = ?`;
                db.query(deleteQ, [username], (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Internal server error');
                    }
                    return res.status(200).send('Company approved and removed from registration table');
                });
            });
        } else {
            return res.status(200).send('Company rejected');
        }
    });
};

//get list of approve company
export function get_approved_company(req, res) {
    const q = "SELECT `username`, `company_name`,`company_address`, `est`, `email`, `ph_no`, `zip_code`,`logo` FROM company_details";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}

export function update_Company_profile(req, res) {
    const { password, email, company_name, company_address, zip_code, chairman, ph_no, est, media_links, tag_line, industry, headquarter, logo, award, description } = req.body;
    const { username } = req.params;

    console.log(req.body);
    const updateFields = [];
    const queryParams = [];

    // Build the dynamic SQL query based on the provided fields
    if (password) {
        bcrypt.hash(password, 10, function (err, hashedPassword) {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error');
            }
            updateFields.push('password = ?');
            queryParams.push(hashedPassword);
            executeQuery();
        });
    } else {
        executeQuery();
    }

    function executeQuery() {
        if (email) {
            updateFields.push('email = ?');
            queryParams.push(email);
        }
        if (company_name) {
            updateFields.push('company_name = ?');
            queryParams.push(company_name);
        }
        if (company_address) {
            updateFields.push('company_address = ?');
            queryParams.push(company_address);
        }
        if (zip_code) {
            updateFields.push('zip_code = ?');
            queryParams.push(zip_code);
        }
        if (chairman) {
            updateFields.push('chairman = ?');
            queryParams.push(chairman);
        }
        if (ph_no) {
            updateFields.push('ph_no = ?');
            queryParams.push(ph_no);
        }
        if (est) {
            updateFields.push('est = ?');
            queryParams.push(est);
        }
        if (media_links) {
            updateFields.push('media_links = ?');
            queryParams.push(media_links);
        }
        if (tag_line) {
            updateFields.push('tag_line = ?');
            queryParams.push(tag_line);
        }
        if (industry) {
            updateFields.push('industry = ?');
            queryParams.push(industry);
        }
        if (headquarter) {
            updateFields.push('headquarter = ?');
            queryParams.push(headquarter);
        }
        if (logo) {
            updateFields.push('logo = ?');
            queryParams.push(logo);
        }
        if (award) {
            updateFields.push('award = ?');
            queryParams.push(award);
        }
        if (description) {
            updateFields.push('description = ?');
            queryParams.push(description);
        }

        if (updateFields.length === 0) {
            return res.status(400).send('No fields provided to update');
        }

        queryParams.push(username);

        const q = `UPDATE company_details SET ${updateFields.join(', ')} WHERE username = ?`;

        db.query(q, queryParams, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error');
            }
            return res.status(200).send('Company profile updated successfully');
        });
    }
};


export function get_field_from_Company_details(req, res) {
    const { username } = req.params;
    const q = `SELECT username,company_name,zip_code, est FROM company_details WHERE username=?`
    db.query(q, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(result[0]);
    });
}

// job post

// export const job_post = (req, res) => {
//     const q =
//         `INSERT INTO  job_post (job_id, job_name, job_type, perks, eligibility,department, company_name,company_address, deadline, duration, description, job_location ) VALUES ?`;
//     const values = [
//         [
//             req.body.job_id,
//             req.body.job_name,
//             req.body.job_type,
//             req.body.perks,
//             req.body.eligibility,
//             req.body.department,
//             req.body.company_name,
//             req.body.company_address,
//             req.body.deadline,
//             req.body.duration,
//             req.body.description,
//             req.body.job_location
//         ]
//     ];

//     db.query(q, [values], (err, data) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         console.log(req.body);
//         return res.status(201).json({ message: 'Added successfully' });
//     });
// };
export const job_post = (req, res) => {
    const job_id = req.body.job_id;
    const q = `SELECT * FROM job_post WHERE job_id = ?`;
    const checkQuery = db.query(q, [job_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length > 0) {
            // Job_id already exists
            return res.status(400).json({ error: 'Job ID already exists' });
        } else {
            const insertQuery = `INSERT INTO job_post (id,job_id, job_name, job_type, perks, eligibility, department, company_name, company_address, deadline, duration, description, job_location) VALUES ?`;
            const values = [
                [
                    req.body.id,
                    req.body.job_id,
                    req.body.job_name,
                    req.body.job_type,
                    req.body.perks,
                    req.body.eligibility,
                    req.body.department,
                    req.body.company_name,
                    req.body.company_address,
                    req.body.deadline,
                    req.body.duration,
                    req.body.description,
                    req.body.job_location
                ]
            ];
            db.query(insertQuery, [values], (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                console.log(req.body);
                return res.status(201).json({ message: 'Added successfully' });
            });
        }
    });
};

// to get certain fieldds from job post
export function get_field_from_jobPost(req, res) {
    const { company_name } = req.params;
    const q = `SELECT job_id,job_name, job_type,perks,eligibility,department,company_name,deadline,duration,description, job_location, company_address FROM job_post WHERE company_name=?`
    db.query(q, [company_name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(result);
    });
}
export function get_field_from_jobPost2(req, res) {
    const { job_id } = req.params;
    const q = `SELECT job_name, job_type,perks,eligibility,department,company_name,deadline,description,duration, job_location, company_address, job_id FROM job_post WHERE job_id=?`
    db.query(q, [job_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(result);
    });
}

//to get job drives for students
export function jobDrivesStudent(req, res) {
    const q = `SELECT job_name, job_type,perks,eligibility,department,job_post.company_name,deadline,job_post.description,duration, job_location, job_post.company_address,logo,job_id , job_post.id FROM job_post JOIN company_details ON job_post.id = company_details.id`;
    db.query(q, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(result);
    });
}

//job drive wrt  department for studnt
export function jobDrivesStudentDept(req, res) {
    const { department } = req.params;
    const q = `SELECT job_name, job_type,perks,eligibility,department,job_post.company_name,deadline,job_post.description,duration, job_location, job_post.company_address,logo,job_id , job_post.id FROM job_post JOIN company_details ON job_post.id = company_details.id  where job_post.department=?`
    db.query(q, [department], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(result);
    });
}

// appllied jobs
export function appliedJobs(req, res) {
    const q = `INSERT INTO appliedjobs (job_id,username,department) VALUES ?`;
    const values = [
        [
            req.body.job_id,
            req.body.username,
            req.body.department
        ]
    ];
    db.query(q, [values], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(req.body);
        return res.status(201).json({ message: 'Added successfully' });
    });
}


//update job post
export const update_job_post = (req, res) => {
    const q = `UPDATE job_post SET 
               job_name = ?, 
               job_type = ?, 
               perks = ?, 
               eligibility = ?, 
               department = ?, 
               company_name = ?, 
               deadline = ?, 
               duration = ?, 
               description = ?, 
               job_location = ? 
               WHERE job_id = ?`;
    const values = [
        req.body.job_name,
        req.body.job_type,
        req.body.perks,
        req.body.eligibility,
        req.body.department,
        req.body.company_name,
        req.body.deadline,
        req.body.duration,
        req.body.description,
        req.body.job_location,
        req.params.job_id
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(req.body);
        return res.status(200).json({ message: 'Updated successfully' });
    });
};

// get student details for AG grid table
export function getStudentDetailsForTable(req, res) {
    const jobId = req.params.job_id;
    const q = `
    SELECT sd.*, aj.status
    FROM student_details sd
    JOIN appliedjobs aj ON sd.username = aj.username
    WHERE aj.job_id = ?
  `;
    db.query(q, [jobId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'No student details found for the given job ID' });
        }
        return res.status(200).json(result);
    });
}


//accept the students for applied jobs
export function acceptStudent(req, res) {
    const jobId = req.params.job_id;
    const username = req.params.username;
    const q = `UPDATE appliedjobs SET status = 'Accepted', applicationStatus= 'Accepted' WHERE job_id = ? AND username = ?`;

    db.query(q, [jobId, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No matching record found to update' });
        }
        return res.status(200).json({ message: 'Student accepted for the job' });
    });
}

// check the accepted student
export function checkStudentAccepted(req, res) {
    const jobId = req.params.job_id;
    const username = req.params.username;
    const q = `SELECT status FROM appliedjobs WHERE job_id = ? AND username = ?`;

    db.query(q, [jobId, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length > 0 && result[0].status === 'Accepted') {
            return res.status(200).json({ message: 'Student already accepted for the job' });
        }
    });
}


//remove the student
export function deleteStudent(req, res) {
    const jobId = req.params.job_id;
    const username = req.params.username;
    const q = `DELETE FROM appliedjobs WHERE job_id = ? AND username = ?`;

    db.query(q, [jobId, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No matching record found to delete' });
        }
        return res.status(200).json({ message: 'Student deleted from the job' });
    });
}


//controller to select a student


//endpoint to post student application status
export function ApplicationStatus(req, res) {
    const jobId = req.params.job_id;
    const username = req.params.username;
    const newStatus = req.body.applicationStatus;

    const q = `UPDATE appliedjobs SET applicationStatus = ? WHERE job_id = ? AND username = ?`;

    db.query(q, [newStatus, jobId, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Job application not found' });
        }

        return res.status(200).json({ message: 'Job application status updated successfully' });
    });
};

// get status of applicants
export function getStatusOfApplicant(req, res) {
    const { username } = req.params;
    const { job_id } = req.params;

    const q = `SELECT applicationStatus FROM appliedjobs WHERE job_id = ? AND username = ?`;

    db.query(q, [job_id, username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(result);
    });
}


// to get that which are the jobs in which the student has applied on
export function getAppliedJobs(req, res) {
    const username = req.params.username;
    const q = `SELECT j.*, aj.* FROM job_post j JOIN appliedjobs aj ON j.job_id = aj.job_id WHERE aj.username = ?`;
    db.query(q, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'No jobs found for the given username' });
        }
        return res.status(200).json(result);
    });
}


//  //accept the students for applied jobs
//  export function acceptStudent(req, res) {
//     const jobId = req.params.job_id;
//     const username = req.params.username;
//     const q1 = `SELECT status FROM appliedjobs WHERE job_id = ? AND username = ?`;
//     db.query(q1, [jobId, username], (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       if (result.length === 0) {
//         return res.status(404).json({ error: 'No matching record found' });
//       }
//       const currentStatus = result[0].status;
//       if (currentStatus === 'Accepted') {
//         return res.status(200).json({ message: 'Student is already accepted for the job' });
//       }
//       const q2 = `UPDATE appliedjobs SET status = 'Accepted' WHERE job_id = ? AND username = ?`;
//       db.query(q2, [jobId, username], (err, result) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         if (result.affectedRows === 0) {
//           return res.status(404).json({ error: 'No matching record found to update' });
//         }
//         return res.status(200).json({ message: 'Student accepted for the job' });
//       });
//     });
//   }

export function getSelectedStudentForChart(req, res) {
    const q = `
    SELECT department, COUNT(*) AS count
    FROM appliedjobs
    WHERE status = 'Accepted'
    GROUP BY department
  `;

    db.query(q, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(result);
    });
}
// get sunmber of students placed for each company
export function getPlacementsByCompany(req, res) {
    const query = `SELECT job_post.company_name, COUNT(*) AS num_students_selected
                   FROM appliedjobs
                   JOIN job_post ON appliedjobs.job_id = job_post.job_id
                   WHERE appliedjobs.status = 'Accepted'
                   GROUP BY job_post.company_name`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        return res.status(200).json(result);
    });
};
