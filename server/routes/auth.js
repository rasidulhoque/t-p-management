import { Add_admin, Admin_login, Admins, Admin, Master_admin, Insert_admin, Delete_admin, viewAllAdmins, stu_login, countRegStudent, countRegCompany, company_login, company_logout } from "../controllers/auth.js";
import { approve_student, get_students, get_approved_students, event_detail, get_event_details, getTotalStudents, countAdmins, calender_event, get_TPO_profile, get_company_profile, Delete_company, countCompany, add_departments, get_departments, delete_department, postHomepageAboutCollege, postHomepageAboutPlacementPro, getAllEvents, deleteEvent, getAcceptedStudnt } from "../controllers/admin.js";
import { getCompanies, approve_company, get_approved_company, get_field_from_Company_details, update_Company_profile, job_post, get_field_from_jobPost, update_job_post, get_field_from_jobPost2, jobDrivesStudent, jobDrivesStudentDept, appliedJobs, getStudentDetailsForTable, acceptStudent, checkStudentAccepted, deleteStudent, ApplicationStatus, getStatusOfApplicant, getAppliedJobs, getSelectedStudentForChart, getPlacementsByCompany } from "../controllers/company.js";
import express from "express";
import { create_stu_profile, get_field_from_stu_details, get_stu_profile } from "../controllers/student.js";
import multer from "multer";
import path from "path";
const router = express.Router();

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/') 
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/uploads')
//     },
//     filename: function (req, file, cb) {

//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage: storage });


// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 10
//     }
// });

router.post("/Admin_login", Admin_login);
router.post("/company_login", company_login);
router.post("/Add_admin", Add_admin);
router.get("/Admins", Admins);
router.get('/Admin/:username', Admin);
router.get('/Master_admin', Master_admin);
router.post('/Insert_admin', Insert_admin);
router.delete('/Delete_admin/:username', Delete_admin);
router.delete("/Delete_company/:username", Delete_company);
router.get('/viewAllAdmins', viewAllAdmins);
router.post('/stu_login', stu_login);
// router.post('/company_register', company_register);
router.get('/get_students', get_students)
router.put('/approve_student', approve_student)
router.get('/get_approved_students', get_approved_students)
router.get('/getCompanies', getCompanies);
router.put('/approve_company', approve_company);
router.get('/get_approved_company', get_approved_company);
router.post('/event_detail', event_detail);
router.get('/get_event_details', get_event_details);
router.get('/getTotalStudents', getTotalStudents);
router.get('/countAdmins', countAdmins);
router.get('/countRegStudent', countRegStudent);
router.get('/countRegCompany', countRegCompany);
router.post('/create_stu_profile', create_stu_profile);
// router.put('/update_stu_profile/:username', update_stu_profile);
router.get('/get_field_from_stu_details/:username', get_field_from_stu_details)
router.get('/calender_event', calender_event);
router.get('/get_field_from_Company_details/:username', get_field_from_Company_details);
router.put('/update_Company_profile/:username', update_Company_profile);
// router.put('/update_Admin_profile/:username',update_Admin_profile);
router.get('/get_TPO_profile', get_TPO_profile);
router.get('/get_company_profile', get_company_profile);
router.get('/countCompany', countCompany);
router.post('/add_departments', add_departments);
router.get('/get_departments', get_departments);
router.delete("/delete_department/:department", delete_department);
router.post("/job_post", job_post);
router.get("/get_field_from_jobPost/:company_name", get_field_from_jobPost);
router.get("/get_field_from_jobPost2/:job_id", get_field_from_jobPost2);
router.put("/update_job_post/:job_id", update_job_post);
router.post("company_logout/", company_logout);
router.get("/jobDrivesStudent", jobDrivesStudent);
router.get("/get_stu_profile/:username", get_stu_profile);
router.get("/jobDrivesStudentDept/:department", jobDrivesStudentDept);
router.post("/appliedJobs", appliedJobs);
router.get("/getStudentDetailsForTable/:job_id", getStudentDetailsForTable);
router.put("/acceptStudent/:job_id/:username", acceptStudent);
router.get("/checkStudentAccepted/:job_id/:username", checkStudentAccepted);
router.delete("/deleteStudent/:job_id/:username", deleteStudent);
router.put("/ApplicationStatus/:job_id/:username", ApplicationStatus);
router.get("/getStatusOfApplicant/:job_id/:username", getStatusOfApplicant);
router.get("/getAppliedJobs/:username",getAppliedJobs);
router.put("/postHomepageAboutCollege/:id", postHomepageAboutCollege);
router.post("/postHomepageAboutPlacementPro",postHomepageAboutPlacementPro);
router.get("/getSelectedStudentForChart",getSelectedStudentForChart);
router.get("/getAllEvents",getAllEvents);
router.delete("/deleteEvent/:event_id",deleteEvent);
router.get("/getPlacementsByCompany",getPlacementsByCompany);
router.get("/getAcceptedStudnt",getAcceptedStudnt);
export default router;

//for uploading images
// if single image then.......upload.single;
// if multiple images then ...... upload.fields or upload.array