import { db } from "../db.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

//fetch all the students
export function get_students(req, res) {
  const q = "SELECT `firstName`, `lastName`, `username`, `ph_no`, `email`, `course`, `reg_no` ,`reg_card`,`resume`,`profilePic` FROM stu_register";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}
// approve student
export function approve_student(req, res) {
  const { username, status } = req.body;
  const q = `UPDATE stu_register SET status = ? WHERE username = ?`;
  db.query(q, [status, username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    if (status === 'approved') {
      const q = `INSERT INTO student_details (firstName, lastName, username, course, email, ph_no, reg_no, resume, profilePic, password) SELECT firstName, lastName, username, course, email, ph_no, reg_no, resume, profilePic, password FROM stu_register WHERE username = ?`;
      db.query(q, [username], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal server error');
        }
        const deleteQ = `DELETE FROM stu_register WHERE username = ?`;
        db.query(deleteQ, [username], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
          }
          return res.status(200).send('Student approved and removed from registration table');
        });
      });
    } else {
      return res.status(200).send('Student rejected');
    }
  });
};

export function get_approved_students(req, res) {
  const q = "SELECT *, NULL as password FROM student_details";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}

//event upload
export function event_detail(req, res) {
  const { event_id, event_name, venue, starting_date, end_date, desc } = req.body;

  // Check if event with same event_id already exists
  const checkEventQuery = "SELECT * FROM event_details WHERE event_id=?";
  db.query(checkEventQuery, [event_id], function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(409).json({ message: "Event with same ID already exists." });
    } else {
      const insertEventQuery = "INSERT INTO event_details (`event_id`, `event_name`, `venue`, `starting_date`, `end_date`, `desc`) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(insertEventQuery, [event_id, event_name, venue, starting_date, end_date, desc], function (err, result) {
        if (err) throw err;
        return res.status(201).json({ message: "Event created successfully." });
      });
    }
  });
}
//delete event
export function deleteEvent(req, res) {
  const { event_id } = req.params;

  const deleteEventQuery = "DELETE FROM event_details WHERE event_id=?";
  db.query(deleteEventQuery, [event_id], function (err, result) {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found." });
    }
    return res.status(200).json({ message: "Event deleted successfully." });
  });
}
//get event details page
export function getAllEvents(req, res) {
  const getAllEventsQuery = "SELECT * FROM event_details";

  db.query(getAllEventsQuery, function (err, results) {
    if (err) throw err;
    return res.status(200).json(results);
  });
}
//get event details lathigh_qualification four
export function get_event_details(req, res) {
  const query = "SELECT event_id, event_name, starting_date FROM event_details ORDER BY event_id DESC LIMIT 4";

  db.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error retrieving lathigh_qualification events.' });
    }
    return res.json({ events: results });

  });
}

//get event details in calender
export function calender_event(req, res) {
  const query = 'SELECT starting_date, end_date, event_name FROM event_details';
  db.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error retrieving events:', error);
      res.status(500).json({ error: 'Error retrieving events' });
    } else {
      // Format the events data for use in the frontend
      const events = results.map(row => ({
        title: row.event_name,
        start: row.starting_date,
        end: row.end_date
      }));
      // Return the events data as a JSON response
      res.json(events);
    }
  });
}

//get count of total student
export function getTotalStudents(req, res) {
  const q = 'SELECT COUNT(*) AS total_students FROM student_details';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    const { total_students } = data[0];
    return res.status(200).json({ total_students });
  });
}

// Count the number of admins
export const countAdmins = (req, res) => {
  const sql = "SELECT COUNT(*) as count FROM admin_details";
  db.query(sql, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.json({ count });
  });
};

//
export const countCompany = (req, res) => {
  const sql = `SELECT COUNT(*) as count FROM company_details`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.json({ count });
  })
}

//update the admin profile
// export function update_Admin_profile(req, res) {
//   const { password, email, name, employee_id, designation, joining_date, ph_no, high_qualification, linkedin_id } = req.body;
//   const { username } = req.params;

//   console.log(req.body);
//   console.log(req.file);
//   bcrypt.hash(password, 10, function (err, hashedPassword) {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal server error');
//     }

//     const q = `UPDATE admin_details SET password = ?, email = ?, name = ?, employee_id = ?, designation = ?, joining_date = ?, ph_no = ?, high_qualification = ?, linkedin_id = ?, photo = ? WHERE username = ?`;
//     const values = [
//       hashedPassword,
//       email,
//       name,
//       employee_id,
//       designation,
//       joining_date,
//       ph_no,
//       high_qualification,
//       linkedin_id,
//       req.file.filename,
//       username
//     ];
//     db.query(q, values, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Internal server error');
//       }
//       return res.status(200).send('Admin profile updated successfully');
//     });
//   });
// };
// export function update_Admin_profile(req, res) {
//   const { password, email, name, employee_id, designation, joining_date, ph_no, high_qualification, linkedin_id } = req.body;
//   const { username } = req.params;

//   console.log(req.body);
//   console.log(req.file);
//   bcrypt.hash(password, 10, function (err, hashedPassword) {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal server error');
//     }

//     const q = `UPDATE admin_details SET password = ?, email = ?, name = ?, employee_id = ?, designation = ?, joining_date = ?, ph_no = ?, high_qualification = ?, linkedin_id = ?, photo = ? WHERE username = ?`;
//     const values = [
//       password ? hashedPassword : null,
//       email || null,
//       name || null,
//       employee_id || null,
//       designation || null,
//       joining_date || null,
//       ph_no || null,
//       high_qualification || null,
//       linkedin_id || null,
//       req.file ? req.file.filename : null,
//       username
//     ];
//     db.query(q, values, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send('Internal server error');
//       }
//       return res.status(200).send('Admin profile updated successfully');
//     });
//   });
// };
export function update_Admin_profile(req, res) {
  const { password, email, name, employee_id, designation, joining_date, ph_no, high_qualification, linkedin_id } = req.body;
  const { username } = req.params;

  console.log(req.body);
  console.log(req.file);
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    const q = `SELECT * FROM admin_details WHERE username = ?`;
    db.query(q, [username], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }

      const admin = rows[0]; // Assuming only one admin is returned

      // Update the values only if they are provided, otherwise, keep the previous values
      const updatedPassword = password ? hashedPassword : admin.password;
      const updatedEmail = email || admin.email;
      const updatedName = name || admin.name;
      const updatedEmployeeId = employee_id || admin.employee_id;
      const updatedDesignation = designation || admin.designation;
      const updatedJoiningDate = joining_date || admin.joining_date;
      const updatedPhNo = ph_no || admin.ph_no;
      const updatedHighQualification = high_qualification || admin.high_qualification;
      const updatedLinkedinId = linkedin_id || admin.linkedin_id;
      const updatedPhoto = req.file ? req.file.filename : admin.photo;

      const updateQuery = `UPDATE admin_details SET password = ?, email = ?, name = ?, employee_id = ?, designation = ?, joining_date = ?, ph_no = ?, high_qualification = ?, linkedin_id = ?, photo = ? WHERE username = ?`;
      const values = [
        updatedPassword,
        updatedEmail,
        updatedName,
        updatedEmployeeId,
        updatedDesignation,
        updatedJoiningDate,
        updatedPhNo,
        updatedHighQualification,
        updatedLinkedinId,
        updatedPhoto,
        username
      ];
      db.query(updateQuery, values, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal server error');
        }
        return res.status(200).send('Admin profile updated successfully');
      });
    });
  });
};

// TPO profile from admin dash
export function get_TPO_profile(req, res) {
  const q = `SELECT name, username, designation, high_qualification, joining_date, email, ph_no, linkedin_id, photo FROM admin_details`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    if (result.length === 0) {
      return res.status(404).send('No admins found');
    }

    return res.status(200).json(result);
  });
}
//Company profile from the admin dash
export function get_company_profile(req, res) {
  const q = `SELECT company_name, username, tag_line, est, chairman, headquarter, logo, email, description, media_links FROM company_details`;

  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('internal server error');
    };
    if (result.lenght === 0) {
      return res.status(404).send('no company found');
    }
    return res.status(200).json(result);
  })
}

//delete company from the admin dash
export const Delete_company = (req, res) => {
  const { username } = req.params;

  const sql = `SELECT * FROM company_details WHERE username = ?`;
  db.query(sql, [username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ error: "Company not found" });
    } else {
      const deleteSql = `DELETE FROM company_details WHERE username = ?`;
      db.query(deleteSql, [username], async (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
          res.status(404).json({ error: "Company not found" });
        } else {
          res.status(200).json({ message: "Company deleted successfully" });
        }
      });
    }
  }
  );
};

//add departments

export const add_departments = (req, res) => {
  const { departments } = req.body;
  console.log(departments);
  const q = `INSERT INTO  departments (department) VALUES ?`;
  db.query(q, [departments.map(d => [d])], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }
    return res.status(200).send('Departments added successfully');
  });
}

//get all departments
export const get_departments = (req, res) => {
  const q = `SELECT * FROM departments`;
  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    return res.status(200).send(result);
  });
};

// delete Department
export const delete_department = (req, res) => {
  const { department } = req.params;

  const sql = `SELECT * FROM departments WHERE department = ?`;
  db.query(sql, [department], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ error: "Department not found" });
    } else {
      const deleteSql = `DELETE FROM departments WHERE department = ?`;
      db.query(deleteSql, [department], async (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0) {
          res.status(404).json({ error: "Department Not Found" });
        } else {
          res.status(200).json({ message: "department deleted successfully" });
        }
      });
    }
  }
  );
}


//homepage management
export const postHomepageAboutCollege = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json('Invalid ID');
  }

  const q = 'UPDATE homepage SET aboutPlacementCell = ? WHERE id = ?;';
  const values = [req.body.aboutPlacementCell, id];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json('Homepage updated');
  });
};


export const postHomepageAboutPlacementPro = (req, res) => {
  const q = `INSERT INTO homepage (aboutPlacementPro) values(?)`;
  const values = [
    req.body.aboutPlacementPro
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("homepage updated");
  });
}

export const postHomepageGallery = (req, res) => {
  const q = `INSERT INTO homepage (gallery) values(?)`;
  const values = [
    req.files["gallery"][0].filename
  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("homepage updated");
  });
}

export const getAcceptedStudnt = (req, res) => {
  const q = "SELECT  job_name, job_type,perks,company_name,duration, job_location, company_address,firstName,lastName,  email, dob, gender, college, student_details.department,course, batch, student_details.ph_no, address, student_details.medialinks, institute, sem, marks FROM job_post JOIN appliedjobs ON appliedjobs.job_id = job_post.job_id JOIN student_details ON student_details.username = appliedjobs.username WHERE status = 'Accepted'";
  db.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    return res.status(200).send(result);
  });
}