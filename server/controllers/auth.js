import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//registration of a student
export function stu_register(req, res) {
  console.log(req.files);
  console.log(req.body.firstName, "opopop")
  //check existing student
  const q = "SELECT * FROM stu_register WHERE username=? OR reg_no=?";
  db.query(q, [req.body.username, req.body.reg_no], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO stu_register(`firstName`, `lastName`,`username`,`ph_no`,`email`,`course`,`reg_no`,`password`,`reg_card`,`resume`,`profilePic`) VALUES (?)";
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.ph_no,
      req.body.email,
      req.body.course,
      req.body.reg_no,
      hash,
      req.files["reg_card"][0].filename,
      req.files["resume"][0].filename,
      req.files["profilePic"][0].filename,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
}


//count of student registered
export function countRegStudent(req, res) {
  const sql = 'SELECT COUNT(*) AS count FROM stu_register';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve count of registered students' });
    } else {
      const count = results[0].count;
      res.json({ count });
    }
  });
}
//count of company registered
export function countRegCompany(req, res) {
  const sql = 'SELECT COUNT(*) as count FROM company_register';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrive count of registered student' });
    } else {
      const count = result[0].count;
      res.json({ count });
    }
  })
}

//student login
export function stu_login(req, res) {
  const { username, password } = req.body;
  const q = "SELECT * FROM student_details WHERE username=?";
  db.query(q, [username], (err, data) => {
    if (err) return res.json(err);
    if (!data.length) return res.status(401).json("Invalid username or password");

    const user = data[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json("Invalid username or password");

    const payload = { username: user.username, role: "student" };
    const token = jwt.sign(payload, "mysecretkey", { algorithm: "HS256" });

    res.cookie("token", token, {
      httpOnly: true,
      // maxAge: 86400000, // 24 hours
    });
    res.status(200).json({ username, department: user.department });
  });
}

//admin login
// export const Admin_login = (req, res) => {
//   const { username, password } = req.body;
//   const sql = `SELECT * FROM admin_details WHERE username = ?`;
//   db.query(sql, [username], async (err, results) => {
//     if (err) throw err;
//     if (results.length === 0) {
//       res.status(401).json({ error: "Invalid username or password" });
//     } else {
//       const is_master_admin = results[0].is_master_admin;
//       const isMatch =  bcrypt.compare(password, results[0].password);
//       if (isMatch) {
//         res.json({ is_master_admin });
//       } else {
//         res.status(401).json({ error: "Invalid username or password" });
//       }
//     }

//   });
// };
//Admin_login
export const Admin_login = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM admin_details WHERE username = ?`;
  db.query(sql, [username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(401).json({ error: "Invalid username or password" });
    } else {
      const is_master_admin = results[0].is_master_admin;
      const isMatch = bcrypt.compare(password, results[0].password);
      if (isMatch) {
        const payload = { username: results[0].username, role: "admin" };
        const token = jwt.sign(payload, "mysecretkey", { algorithm: "HS256" });
        res.cookie("token", token, {
          httpOnly: true,
          // maxAge: 86400000, // 24 hours
        });
        res.status(200).json({ username: results[0].username , photo: results[0].photo});
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    }
  });
};


//company login
export function company_login(req, res) {
  const { username, password } = req.body;
  const q = "SELECT * FROM company_details WHERE username=?";
  db.query(q, [username], (err, data) => {
    if (err) return res.json(err);
    if (!data.length) return res.status(401).json("Invalid username or password");

    const user = data[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json("invalid username or password");
    const payload = { username: user.username, role: "company" };
    const token = jwt.sign(payload, "mysecretkey", { algorithm: "HS256" });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({ username, company_name: user.company_name, company_address: user.company_address, logo: user.logo ,id: user.id});
  })
}
//company logout
export function company_logout(req, res) {
  res.clearCookie("token");
  res.status(200).json("Successfully logged out");
}


//company register
export function company_register(req, res) {
  console.log(req.files);
  //check exixting student
  const q = "SELECT * FROM company_register WHERE username=? OR username=?";
  db.query(q, [req.body.username, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO company_register(`username`, `company_name`,`company_address`,`est`,`email`,`ph_no`,`zip_code`,`company_licence`,`logo`,`password`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.company_name,
      req.body.company_address,
      req.body.est,
      req.body.email,
      req.body.ph_no,
      req.body.zip_code,
      req.files["company_licence"][0].filename,
      req.files["logo"][0].filename,
      hash,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
}




//add admin
export const Add_admin = (req, res) => {
  const q = "SELECT * FROM admin_details WHERE username=? OR employee_id=?";
  db.query(q, [req.body.username, req.body.employee_id], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q =
      "INSERT INTO admin_details (`username`, `name`, `is_master_admin`, `password`, `employee_id`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.username,
      req.body.name,
      false,
      hash,
      req.body.employee_id,
    ];
    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add admin" });
      } else {
        res.status(200).json({ message: "Admin added successfully!" });
      }
    });
  });
};

//delete admin
export const Delete_admin = (req, res) => {
  const { username } = req.params;

  const sql = `SELECT * FROM admin_details WHERE username = ?`;
  db.query(sql, [username], async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ error: "Admin not found" });
    } else {
      const isAdminMasterAdmin = results[0].is_master_admin;
      if (isAdminMasterAdmin === 1) {
        res.status(403).json({ error: "Deleting master admin is not allowed" });
      } else {
        const deleteSql = `DELETE FROM admin_details WHERE username = ?`;
        db.query(deleteSql, [username], async (err, results) => {
          if (err) throw err;
          if (results.affectedRows === 0) {
            res.status(404).json({ error: "Admin not found" });
          } else {
            res.status(200).json({ message: "Admin deleted successfully" });
          }
        });
      }
    }
  });
};

//view all admin
export const viewAllAdmins = (req, res) => {
  const q = "SELECT username, name, employee_id FROM admin_details WHERE is_master_admin = 0 ";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch admins" });
    } else {
      res.status(200).json(data);
    }
  });
};





//retrive all admins(normal)
export const Admins = (req, res) => {
  const sql = "SELECT * FROM admin_details ";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

// retrive single admin by id
export const Admin = (req, res) => {
  const username = req.params.username;
  console.log(username);
  const sql = `SELECT * FROM admin_details WHERE username = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: "Admin not found" });
    } else {
      res.json(result);
    }
  });
};
//insert admin
export const Insert_admin = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const q =
    "INSERT INTO admin_details (`username`, `name`, `is_master_admin`,`password`,`employee_id`) VALUES (?)";
  const values = [
    req.body.username,
    req.body.name,
    req.body.is_master_admin,
    hash,
    req.body.employee_id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("added successfully");
  });
};

// retrive master admin
export const Master_admin = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM admin_details WHERE is_master_admin = 1`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).json({ error: "Master admin not found" });
    } else {
      res.json(result[0]);
    }
  });
};

