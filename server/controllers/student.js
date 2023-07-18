import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function create_stu_profile(req, res) {
    const { username, password, email, firstName, lastName, dob, gender, college, batch, ph_no, address, medialinks, institute, dept, course, sem, marks, reg_no, marksheet, prevInstitute, prevDept, prevDegree, prevMarks, prevReg_no, prevMarksheet, cerInstitute, cerCourseName, cerDuration, cerMarks, cerReg_no, cerCertificate, skill, resume } = req.body;

    // Hash password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }

        const q = `INSERT INTO student_details (username, password,email, firstName, lastName, dob, gender, college, batch, ph_no, address, medialinks, institute, dept, course, sem, marks, reg_no, marksheet, prevInstitute, prevDept, prevDegree, prevMarks, prevReg_no, prevMarksheet, cerInstitute, cerCourseName, cerDuration, cerMarks, cerReg_no, cerCertificate, skill, resume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
        db.query(q, [username, hash, email, firstName, lastName, dob, gender, college, batch, ph_no, address, medialinks, institute, dept, course, sem, marks, reg_no, marksheet, prevInstitute, prevDept, prevDegree, prevMarks, prevReg_no, prevMarksheet, cerInstitute, cerCourseName, cerDuration, cerMarks, cerReg_no, cerCertificate, skill, resume], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal server error');
            } 
            return res.status(200).send('Student profile created successfully');
        });
    }); 
};

//update student details
export function update_stu_profile(req, res) {
    const { password, email, dob, gender, college, department, batch, ph_no, address, medialinks, institute, sem, marks, marksheet, prevInstitute, prevDept, prevDegree, prevMarks, prevReg_no, prevMarksheet, cerInstitute, cerCourseName, cerDuration, cerMarks, cerReg_no, cerCertificate, achievement } = req.body;
    const { username } = req.params;
  
    console.log(req.body);
    console.log(req.file);
  
    bcrypt.hash(password, 10, function (err, hashedPassword) {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
  
      const q = `SELECT * FROM student_details WHERE username = ?`;
      db.query(q, [username], (err, rows) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal server error');
        }
  
        const student = rows[0]; // Assuming only one student is returned
  
        // Update the values only if they are provided, otherwise, keep the previous values
        const updatedPassword = password ? hashedPassword : student.password;
        const updatedEmail = email || student.email;
        const updatedDob = dob || student.dob;
        const updatedGender = gender || student.gender;
        const updatedCollege = college || student.college;
        const updatedDepartment = department || student.department;
        const updatedBatch = batch || student.batch;
        const updatedPhNo = ph_no || student.ph_no;
        const updatedAddress = address || student.address;
        const updatedMedialinks = medialinks || student.medialinks;
        const updatedInstitute = institute || student.institute;
        const updatedSem = sem || student.sem;
        const updatedMarks = marks || student.marks;
        const updatedMarksheet = marksheet || student.marksheet;
        const updatedPrevInstitute = prevInstitute || student.prevInstitute;
        const updatedPrevDept = prevDept || student.prevDept;
        const updatedPrevDegree = prevDegree || student.prevDegree;
        const updatedPrevMarks = prevMarks || student.prevMarks;
        const updatedPrevRegNo = prevReg_no || student.prevReg_no;
        const updatedPrevMarksheet = prevMarksheet || student.prevMarksheet;
        const updatedCerInstitute = cerInstitute || student.cerInstitute;
        const updatedCerCourseName = cerCourseName || student.cerCourseName;
        const updatedCerDuration = cerDuration || student.cerDuration;
        const updatedCerMarks = cerMarks || student.cerMarks;
        const updatedCerRegNo = cerReg_no || student.cerReg_no;
        const updatedCerCertificate = cerCertificate || student.cerCertificate;
        const updatedAchievement = achievement || student.achievement;
        const updatedResume = req.file ? req.file.filename : student.resume;
  
        const updateQuery = `UPDATE student_details SET password = ?, email = ?, dob = ?, gender = ?, college = ?, department = ?, batch = ?, ph_no = ?, address = ?, medialinks = ?, institute = ?, sem = ?, marks = ?, marksheet = ?, prevInstitute = ?, prevDept = ?, prevDegree = ?, prevMarks = ?, prevReg_no = ?, prevMarksheet = ?, cerInstitute = ?, cerCourseName = ?, cerDuration = ?, cerMarks = ?, cerReg_no = ?, cerCertificate = ?, achievement = ?, resume = ? WHERE username = ?`;
        const values = [
          updatedPassword,
          updatedEmail,
          updatedDob,
          updatedGender,
          updatedCollege,
          updatedDepartment,
          updatedBatch,
          updatedPhNo,
          updatedAddress,
          updatedMedialinks,
          updatedInstitute,
          updatedSem,
          updatedMarks,
          updatedMarksheet,
          updatedPrevInstitute,
          updatedPrevDept,
          updatedPrevDegree,
          updatedPrevMarks,
          updatedPrevRegNo,
          updatedPrevMarksheet,
          updatedCerInstitute,
          updatedCerCourseName,
          updatedCerDuration,
          updatedCerMarks,
          updatedCerRegNo,
          updatedCerCertificate,
          updatedAchievement,
          updatedResume,
          username
        ];
  
        db.query(updateQuery, values, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
          }
          return res.status(200).send('Student profile updated successfully');
        });
      });
    });
  };
  

// export function update_stu_profile(req, res) {
//     const {
//         password,
//         email,
//         dob,
//         gender,
//         college,
//         department,
//         batch,
//         ph_no,
//         address,
//         medialinks,
//         institute,
//         sem,
//         marks,
//         marksheet,
//         prevInstitute,
//         prevDept,
//         prevDegree,
//         prevMarks,
//         prevReg_no,
//         prevMarksheet,
//         cerInstitute,
//         cerCourseName,
//         cerDuration,
//         cerMarks,
//         cerReg_no,
//         cerCertificate,
//         achievement
//     } = req.body;

//     const { username } = req.params;

//     console.log(req.body);
//     bcrypt.hash(password, 10, function (err, hashedPassword) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Internal server error');
//         }

//         const q = `UPDATE student_details SET password = ?, email = ?, dob = ?, gender = ?, college = ?, department = ?, batch = ?, ph_no = ?, address = ?, medialinks = ?, institute = ?, sem = ?, marks = ?, marksheet = ?, prevInstitute = ?, prevDept = ?, prevDegree = ?, prevMarks = ?, prevReg_no = ?, prevMarksheet = ?, cerInstitute = ?, cerCourseName = ?, cerDuration = ?, cerMarks = ?, cerReg_no = ?, cerCertificate = ?, achievement = ?, resume = ? WHERE username = ?`;
//         const values = [
//             hashedPassword,
//             email ,  
//             dob ,
//             gender ,
//             college ,
//             department ,
//             batch ,
//             ph_no ,
//             address ,
//             medialinks ,
//             institute ,
//             sem ,
//             marks ,
//             marksheet ,
//             prevInstitute ,
//             prevDept ,
//             prevDegree ,
//             prevMarks ,
//             prevReg_no ,
//             prevMarksheet ,
//             cerInstitute ,
//             cerCourseName ,
//             cerDuration ,
//             cerMarks ,
//             cerReg_no ,
//             cerCertificate ,
//             achievement ,
//             req.file.filename ,
//             username
//         ];

//         db.query(q, values, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Internal server error');
//             }
//             return res.status(200).send('Student profile updated successfully');
//         });
//     });
// }
// export function update_stu_profile(req, res) {
//     const {
//         password,
//         email,
//         dob,
//         gender,
//         college,
//         department,
//         batch,
//         ph_no,
//         address,
//         medialinks,
//         institute,
//         sem,
//         marks,
//         marksheet,
//         prevInstitute,
//         prevDept,
//         prevDegree,
//         prevMarks,
//         prevReg_no,
//         prevMarksheet,
//         cerInstitute,
//         cerCourseName,
//         cerDuration,
//         cerMarks,
//         cerReg_no,
//         cerCertificate,
//         achievement
//     } = req.body;

//     const { username } = req.params;

//     console.log(req.body);

//     bcrypt.hash(password, 10, function (err, hashedPassword) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Internal server error');
//         }

//         const q = `UPDATE student_details SET password = COALESCE(?, password), email = COALESCE(?, email), dob = COALESCE(?, dob), gender = COALESCE(?, gender), college = COALESCE(?, college), department = COALESCE(?, department), batch = COALESCE(?, batch), ph_no = COALESCE(?, ph_no), address = COALESCE(?, address), medialinks = COALESCE(?, medialinks), institute = COALESCE(?, institute), sem = COALESCE(?, sem), marks = COALESCE(?, marks), marksheet = COALESCE(?, marksheet), prevInstitute = COALESCE(?, prevInstitute), prevDept = COALESCE(?, prevDept), prevDegree = COALESCE(?, prevDegree), prevMarks = COALESCE(?, prevMarks), prevReg_no = COALESCE(?, prevReg_no), prevMarksheet = COALESCE(?, prevMarksheet), cerInstitute = COALESCE(?, cerInstitute), cerCourseName = COALESCE(?, cerCourseName), cerDuration = COALESCE(?, cerDuration), cerMarks = COALESCE(?, cerMarks), cerReg_no = COALESCE(?, cerReg_no), cerCertificate = COALESCE(?, cerCertificate), achievement = COALESCE(?, achievement) WHERE username = ?`;

//         const values = [
//             hashedPassword,
//             email,
//             dob,
//             gender,
//             college,
//             department,
//             batch,
//             ph_no,
//             address,
//             medialinks,
//             institute,
//             sem,
//             marks,
//             marksheet,
//             prevInstitute,
//             prevDept,
//             prevDegree,
//             prevMarks,
//             prevReg_no,
//             prevMarksheet,
//             cerInstitute,
//             cerCourseName,
//             cerDuration,
//             cerMarks,
//             cerReg_no,
//             cerCertificate,
//             achievement,
//             username
//         ];

//         if (req.file) {
//             q += ', resume = ?';
//             values.push(req.file.filename);
//         }

//         db.query(q, values, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Internal server error');
//             }
//             return res.status(200).send('Student profile updated successfully');
//         });
//     });
// }
// export function update_stu_profile(req, res) {
//     const {
//         password,
//         email,
//         dob,
//         gender,
//         college,
//         department,
//         batch,
//         ph_no,
//         address,
//         medialinks,
//         institute,
//         sem,
//         marks,
//         marksheet,
//         prevInstitute,
//         prevDept,
//         prevDegree,
//         prevMarks,
//         prevReg_no,
//         prevMarksheet,
//         cerInstitute,
//         cerCourseName,
//         cerDuration,
//         cerMarks,
//         cerReg_no,
//         cerCertificate,
//         achievement
//     } = req.body;

//     const { username } = req.params;

//     console.log(req.body);

//     bcrypt.hash(password, 10, function (err, hashedPassword) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Internal server error');
//         }

//         let q = `UPDATE student_details SET`;
//         const values = [];

//         if (password) {
//             q += ' password = ?,';
//             values.push(hashedPassword);
//         }

//         if (email) {
//             q += ' email = ?,';
//             values.push(email);
//         }

//         if (dob) {
//             q += ' dob = ?,';
//             values.push(dob);
//         }

//         if (gender) {
//             q += ' gender = ?,';
//             values.push(gender);
//         }

//         if (college) {
//             q += ' college = ?,';
//             values.push(college);
//         }

//         if (department) {
//             q += ' department = ?,';
//             values.push(department);
//         }

//         if (batch) {
//             q += ' batch = ?,';
//             values.push(batch);
//         }

//         if (ph_no) {
//             q += ' ph_no = ?,';
//             values.push(ph_no);
//         }

//         if (address) {
//             q += ' address = ?,';
//             values.push(address);
//         }

//         if (medialinks) {
//             q += ' medialinks = ?,';
//             values.push(medialinks);
//         }

//         if (institute) {
//             q += ' institute = ?,';
//             values.push(institute);
//         }

//         if (sem) {
//             q += ' sem = ?,';
//             values.push(sem);
//         }

//         if (marks) {
//             q += ' marks = ?,';
//             values.push(marks);
//         }

//         if (marksheet) {
//             q += ' marksheet = ?,';
//             values.push(marksheet);
//         }

//         if (prevInstitute) {
//             q += ' prevInstitute = ?,';
//             values.push(prevInstitute);
//         }

//         if (prevDept) {
//             q += ' prevDept = ?,';
//             values.push(prevDept);
//         }

//         if (prevDegree) {
//             q += ' prevDegree = ?,';
//             values.push(prevDegree);
//         }

//         if (prevMarks) {
//             q += ' prevMarks = ?,';
//             values.push(prevMarks);
//         }

//         if (prevReg_no) {
//             q += ' prevReg_no = ?,';
//             values.push(prevReg_no);
//         }

//         if (prevMarksheet) {
//             q += ' prevMarksheet = ?,';
//             values.push(prevMarksheet);
//         }

//         if (cerInstitute) {
//             q += ' cerInstitute = ?,';
//             values.push(cerInstitute);
//         }

//         if (cerCourseName) {
//             q += ' cerCourseName = ?,';
//             values.push(cerCourseName);
//         }

//         if (cerDuration) {
//             q += ' cerDuration = ?,';
//             values.push(cerDuration);
//         }

//         if (cerMarks) {
//             q += ' cerMarks = ?,';
//             values.push(cerMarks);
//         }

//         if (cerReg_no) {
//             q += ' cerReg_no = ?,';
//             values.push(cerReg_no);
//         }

//         if (cerCertificate) {
//             q += ' cerCertificate = ?,';
//             values.push(cerCertificate);
//         }

//         if (achievement) {
//             q += ' achievement = ?,';
//             values.push(achievement);
//         }

//         // Remove the trailing comma from the query
//         q = q.slice(0, -1);

//         q += ' WHERE username = ?';
//         values.push(username);

//         db.query(q, values, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Internal server error');
//             }
//             return res.status(200).send('Student profile updated successfully');
//         });
//     });
// }




// export function update_stu_profile(req, res) {
//     const { username } = req.params;
//     const { password, email, dob, gender, college, department, batch, ph_no, address, medialinks, institute, sem, marks, marksheet, prevInstitute, prevDept, prevDegree, prevMarks, prevReg_no, prevMarksheet, cerInstitute, cerCourseName, cerDuration, cerMarks, cerReg_no, cerCertificate, achievement } = req.body;

//     console.log(req.body);
//     bcrypt.hash(password, 10, function (err, hashedPassword) {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Internal server error');
//         }

//         const q = `UPDATE student_details SET `;
//         const values = [];

//         if (password) {
//             password ? hashedPassword : null,
//             values.push(hashedPassword);
//         }
//         if (email) {

//             values.push(email);
//         }
//         if (dob) {
//             q += `dob = ?, `;
//             values.push(dob);
//         }
//         if (gender) {
//             q += `gender = ?, `;
//             values.push(gender);
//         }
//         if (college) {
//             q += `college = ?, `;
//             values.push(college);
//         }
//         if (department) {
//             q += `department = ?, `;
//             values.push(department);
//         }
//         if (batch) {
//             q += `batch = ?, `;
//             values.push(batch);
//         }
//         if (ph_no) {
//             q += `ph_no = ?, `;
//             values.push(ph_no);
//         }
//         if (address) {
//             q += `address = ?, `;
//             values.push(address);
//         }
//         if (medialinks) {
//             q += `medialinks = ?, `;
//             values.push(medialinks);
//         }
//         if (institute) {
//             q += `institute = ?, `;
//             values.push(institute);
//         }
//         if (sem) {
//             q += `sem = ?, `;
//             values.push(sem);
//         }
//         if (marks) {
//             q += `marks = ?, `;
//             values.push(marks);
//         }
//         if (marksheet) {
//             q += `marksheet = ?, `;
//             values.push(marksheet);
//         }
//         if (prevInstitute) {
//             q += `prevInstitute = ?, `;
//             values.push(prevInstitute);
//         }
//         if (prevDept) {
//             q += `prevDept = ?, `;
//             values.push(prevDept);
//         }
//         if (prevDegree) {
//             q += `prevDegree = ?, `;
//             values.push(prevDegree);
//         }
//         if (prevMarks) {
//             q += `prevMarks = ?, `;
//             values.push(prevMarks);
//         }
//         if (prevReg_no) {
//             q += `prevReg_no = ?, `;
//             values.push(prevReg_no);
//         }
//         if (prevMarksheet) {
//             q += `prevMarksheet = ?, `;
//             values.push(prevMarksheet);
//         }
//         if (cerInstitute) {
//             q += `cerInstitute = ?, `;
//             values.push(cerInstitute);
//         }
//         if (cerCourseName) {
//             q += `cerCourseName = ?, `;
//             values.push(cerCourseName);
//         }
//         if (cerDuration) {
//             q += `cerDuration = ?, `;
//             values.push(cerDuration);
//         }
//         if (cerMarks) {
//             q += `cerMarks = ?,`;
//             values.push(cerMarks);
//         }
//         if (cerReg_no) {
//             q += `cerReg_no = ?, `;
//             values.push(cerReg_no);
//         }
//         if (cerCertificate) {
//             q += `cerCertificate = ?, `;
//             values.push(cerCertificate);
//         }
//         if (achievement) {
//             q += `achievement = ?, `;
//             values.push(achievement);
//         }

//         // Remove the trailing comma and space
//         q = q.slice(0, -2);

//         // Add the WHERE clause
//         q += ` WHERE username = ?`;

//         // Add the username to the values array
//         values.push(username);

//         // Execute the query
//         db.query(q, values, (err, result) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).send('Internal server error');
//             }
//             return res.status(200).send('Student profile updated successfully');
//         });
//     });
// };

//get everything from student_details
export function get_stu_profile(req, res) {
    const { username } = req.params;

    const q = `SELECT * FROM student_details WHERE username = ?`;

    db.query(q, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }

        if (result.length === 0) {
            return res.status(404).send('Student profile not found');
        }

        const profile = result[0];

        return res.status(200).json(profile);
    });
};


//get few fields from the student_details table

export function get_field_from_stu_details(req, res) {
    const { username } = req.params;
    const q = `SELECT username, lastName,firstName, reg_no FROM student_details WHERE username=?`
    db.query(q, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error');
        }
        return res.status(200).json(result[0]);
    });
}

// const { username } = req.user; // assuming that the username of the currently logged-in user is stored in the "username" field of the req.user object

// // query the database to fetch the student details of the logged-in user
// const query = `SELECT username, reg_no FROM student_details WHERE username = '${username}'`;
// connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Error fetching student details' });
//   }
//   if (results.length === 0) {
//     return res.status(404).json({ error: 'Student details not found' });
//   }

//   const studentDetails = results[0];
//   res.json(studentDetails);
// });