// import * as React from "react";
// import { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import Button from "@mui/material/Button";
// import Nav_company from "../Nav/Nav_company";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";
// import { Autocomplete } from "@mui/material";
// import {
//   CompanyAddressContext,
//   CompanyNameContext,
// } from "../StudentProfile/contexts/StepperContext";
// import { useContext } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Formik, useFormik } from "formik";
// import { object, ref, string, number } from "yup";
// export default function JobPost2({ job_id }) {
//   const navigate = useNavigate();
//   const { companyName, setCompanyName } = useContext(CompanyNameContext);
//   const { companyAddress, setCompanyAddress } = useContext(
//     CompanyAddressContext
//   );
//   console.log(companyName);
//   const [jobPosts, setJobPosts] = useState([]);
//   console.log(jobPosts, "hey please come");
//   console.log(job_id, "zzzzzzzzzzzzzzz");
//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/auth/get_field_from_jobPost2/${job_id}`)
//       .then((response) => {
//         setJobPosts(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   function saveData(val) {
//     console.log("hello");
//     axios
//       .post(`http://localhost:4000/auth/update_job_post/${job_id}`, {
//         ...val,
//       })
//       .then((res) => {
//         navigate("/CompanyDash");
//       })
//       .catch((err) => window.alert(err));
//   }

//   // function UpdateJobPost() {
//   //   const [formData, setFormData] = useState({
//   //     job_name: "",
//   //     job_type: "",
//   //     perks: "",
//   //     eligibility: "",
//   //     department: "",
//   //     company_name: "",
//   //     deadline: "",
//   //     duration: "",
//   //     description: "",
//   //     job_location: "",
//   //     job_id: "",
//   //   });

//   //   const handleChange = (event) => {
//   //     const { name, value } = event.target;
//   //     setFormData((prevState) => ({
//   //       ...prevState,
//   //       [name]: value,
//   //     }));
//   //   };
//   //   const handleSubmit = async (event) => {
//   //     event.preventDefault();
//   //     try {
//   //       await axios.put(
//   //         `http://localhost:4000/auth/update_job_post/${formData.job_id}`,
//   //         formData
//   //       );
//   //       alert("Job post updated successfully");
//   //     } catch (error) {
//   //       console.error(error);
//   //       alert("An error occurred while updating the job post");
//   //     }
//   //   };
//   // }
//   const validationScheme = object({
//     job_name: string().required("Job name is required"),
//     eligibility: string().required("Eligibility is required"),
//     description: string().required("Description is required"),
//     deadline: string().required("Deadline is required"),
//     duration: string().required("Duration is required"),
//     job_location: string().required("Job location is required"),
//     perks: string().required("Perks are required"),
//   });

//   return (
//     <>
//       <Formik
//         initialValues={{
//           job_name: "",
//           perks: "",
//           eligibility: "",
//           company_name: "",
//           deadline: "",
//           duration: "",
//           description: "",
//           job_location: "",
//         }}
//         onSubmit={(values) => saveData(values)}
//         validationSchema={validationScheme}
//       >
//         {({ handleChange, handleSubmit, errors, touched }) => (
//           <React.Fragment>
//             <Paper elevation={6} sx={{ marginRight: "5%", marginLeft: "5%" }}>
//               {jobPosts.map((jobPost) => (
//                 <Box sx={{ padding: 5 }}>
//                   <Grid container spacing={3} key={jobPost.job_id}>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Job Title
//                       </InputLabel>
//                     </Grid>

//                     <Grid item xs={12} sm={10}>
//                       <TextField
//                         required
//                         name="job_name"
//                         fullWidth
//                         size="small"
//                         autoComplete="off"
//                         variant="outlined"
//                         onChange={handleChange("job_name")}
//                         error={
//                           Boolean(touched.job_name) && Boolean(errors.job_name)
//                         }
//                         helperText={touched.job_name && errors.job_name}
//                       >{jobPost.job_name}</TextField>
//                     </Grid>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Eligibility
//                       </InputLabel>
//                     </Grid>
//                     <Grid item xs={12} sm={10}>
//                       <TextField
//                         name="eligibility"
//                         multiline
//                         fullWidth
//                         rows={4}
//                         value={jobPost.eligibility}
//                         onChange={handleChange("eligibility")}
//                         error={
//                           Boolean(touched.eligibility) &&
//                           Boolean(errors.eligibility)
//                         }
//                         helperText={touched.eligibility && errors.eligibility}
//                       ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Description
//                       </InputLabel>
//                     </Grid>
//                     <Grid item xs={12} sm={10}>
//                       <TextField
//                         name="description"
//                         multiline
//                         fullWidth
//                         rows={6}
//                         value={jobPost.description}
//                         onChange={handleChange("description")}
//                         error={
//                           Boolean(touched.description) &&
//                           Boolean(errors.description)
//                         }
//                         helperText={touched.description && errors.description}
//                       ></TextField>
//                     </Grid>

//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Salary & Perks
//                       </InputLabel>
//                     </Grid>

//                     <Grid item xs={12} sm={4}>
//                       <TextField
//                         required
//                         name="perks"
//                         fullWidth
//                         size="small"
//                         autoComplete="off"
//                         variant="outlined"
//                         value={jobPost.perks}
//                         onChange={handleChange("perks")}
//                         error={Boolean(touched.perks) && Boolean(errors.perks)}
//                         helperText={touched.perks && errors.perks}
//                       ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Posted By
//                       </InputLabel>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <Box
//                         sx={{
//                           border: "1px solid black",
//                           p: 1,
//                           cursor: "not-allowed",
//                         }}
//                       >
//                         <Typography
//                           required
//                           name="company_name"
//                           label="Posted By"
//                           fullWidth
//                           size="small"
//                           autoComplete="off"
//                           variant="outlined"
//                         >
//                           {companyName}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Address
//                       </InputLabel>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <Box
//                         sx={{
//                           border: "1px solid black",
//                           p: 1,
//                           cursor: "not-allowed",
//                         }}
//                       >
//                         <Typography
//                           required
//                           name="company_address"
//                           label="Posted By"
//                           fullWidth
//                           size="small"
//                           autoComplete="off"
//                           variant="outlined"
//                         >
//                           {companyAddress}
//                         </Typography>
//                       </Box>
//                     </Grid>

//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Duration
//                       </InputLabel>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <TextField
//                         name="duration"
//                         label="Duration"
//                         fullWidth
//                         size="small"
//                         autoComplete="off"
//                         variant="outlined"
//                         value={jobPost.duration}
//                         onChange={handleChange("duration")}
//                         error={
//                           Boolean(touched.duration) && Boolean(errors.duration)
//                         }
//                         helperText={touched.duration && errors.duration}
//                       ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Job Location
//                       </InputLabel>
//                     </Grid>

//                     <Grid item xs={12} sm={4}>
//                       <TextField
//                         required
//                         name="job_location"
//                         fullWidth
//                         size="small"
//                         autoComplete="off"
//                         variant="outlined"
//                         value={jobPost.job_location}
//                         onChange={handleChange("job_location")}
//                         error={
//                           Boolean(touched.job_location) &&
//                           Boolean(errors.job_location)
//                         }
//                         helperText={touched.job_location && errors.job_location}
//                       ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sm={2}>
//                       <InputLabel
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           fontWeight: 700,
//                         }}
//                       >
//                         Application Deadline
//                       </InputLabel>
//                     </Grid>
//                     <Grid item xs={12} sm={4}>
//                       <TextField
//                         required
//                         name="deadline"
//                         fullWidth
//                         type="date"
//                         size="small"
//                         autoComplete="off"
//                         variant="outlined"
//                         value={jobPost.deadline}
//                         onChange={handleChange("deadline")}
//                         error={
//                           Boolean(touched.deadline) && Boolean(errors.deadline)
//                         }
//                         helperText={touched.deadline && errors.deadline}
//                       ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sm={6} />
//                     <Grid item xs={12} sm={5} />
//                     <Grid item xs={12} sm={4}>
//                       <Button
//                         variant="contained"
//                         sx={{ color: "#ff781f" }}
//                         type="submit"
//                         onClick={handleSubmit}
//                       >
//                         Save
//                       </Button>
//                     </Grid>
//                     <Grid item xs={12} sm={5} />
//                   </Grid>
//                 </Box>
//               ))}
//             </Paper>
//           </React.Fragment>
//         )}
//       </Formik>
//     </>
//   );
// }


















// import * as React from "react";
// import { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import Button from "@mui/material/Button";
// import Nav_company from "../Nav/Nav_company";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";
// import { Autocomplete } from "@mui/material";
// import {
//   CompanyAddressContext,
//   CompanyNameContext,
// } from "../StudentProfile/contexts/StepperContext";
// import { useContext } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Formik, useFormik } from "formik";
// import { object, ref, string, number } from "yup";
// export default function JobPost2({ job_id }) {
//   const navigate = useNavigate();
//   const { companyName, setCompanyName } = useContext(CompanyNameContext);
//   const { companyAddress, setCompanyAddress } = useContext(
//     CompanyAddressContext
//   );
//   console.log(companyName);
//   const [jobPosts, setJobPosts] = useState([]);
//   console.log(jobPosts, "hey please come");
//   console.log(job_id, "zzzzzzzzzzzzzzz");
//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/auth/get_field_from_jobPost2/${job_id}`)
//       .then((response) => {
//         setJobPosts(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);


//   const login = (val) => {
//     axios
//       .post(`http://localhost:4000/auth/update_job_post/${job_id}`, {
//         ...val,
//       })
//       .then((res) => {
//         navigate("/CompanyDash");
//       })
//       .catch((err) => window.alert(err));
//   };
//   function UpdateJobPost() {
//     const [formData, setFormData] = useState({
//       job_name: "",
//       perks: "",
//       eligibility: "",
//       company_name: "",
//       deadline: "",
//       duration: "",
//       description: "",
//       job_location: "",
//     });

//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     };
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       try {
//         await axios.put(
//           `http://localhost:4000/auth/update_job_post/${formData.job_id}`,
//           formData
//         );
//         alert("Job post updated successfully");
//       } catch (error) {
//         console.error(error);
//         alert("An error occurred while updating the job post");
//       }
//     };
//   }

//   return (
//     <>
//       <React.Fragment>
//         <Paper elevation={6} sx={{ marginRight: "5%", marginLeft: "5%" }}>
//           {jobPosts.map((jobPost) => (
//             <Box sx={{ padding: 5 }}>
//               <Grid container spacing={3} key={jobPost.job_id}>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Job Title
//                   </InputLabel>
//                 </Grid>

//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     required
//                     name="job_name"
//                     fullWidth
//                     size="small"
//                     autoComplete="off"
//                     variant="outlined"
//                     value={jobPost.job_name}
//                   ></TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Eligibility
//                   </InputLabel>
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     name="eligibility"
//                     multiline
//                     fullWidth
//                     rows={4}
//                     value={jobPost.eligibility} 
//                   ></TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Description
//                   </InputLabel>
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <TextField
//                     name="description"
//                     multiline
//                     fullWidth
//                     rows={6}
//                     value={jobPost.description}
//                   ></TextField>
//                 </Grid>

//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Salary & Perks
//                   </InputLabel>
//                 </Grid>

//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     required
//                     name="perks"
//                     fullWidth
//                     size="small"
//                     autoComplete="off"
//                     variant="outlined"
//                     value={jobPost.perks}
//                   ></TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Posted By
//                   </InputLabel>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Box
//                     sx={{
//                       border: "1px solid black",
//                       p: 1,
//                       cursor: "not-allowed",
//                     }}
//                   >
//                     <Typography
//                       required
//                       name="company_name"
//                       label="Posted By"
//                       fullWidth
//                       size="small"
//                       autoComplete="off"
//                       variant="outlined"
//                     >
//                       {companyName}
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Address
//                   </InputLabel>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <Box
//                     sx={{
//                       border: "1px solid black",
//                       p: 1,
//                       cursor: "not-allowed",
//                     }}
//                   >
//                     <Typography
//                       required
//                       name="company_address"
//                       label="Posted By"
//                       fullWidth
//                       size="small"
//                       autoComplete="off"
//                       variant="outlined"
//                     >
//                       {companyAddress}
//                     </Typography>
//                   </Box>
//                 </Grid>

//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Duration
//                   </InputLabel>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     name="duration"
//                     label="Duration"
//                     fullWidth
//                     size="small"
//                     autoComplete="off"
//                     variant="outlined"
//                     value={jobPost.duration}
//                   ></TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Job Location
//                   </InputLabel>
//                 </Grid>

//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     required
//                     name="job_location"
//                     fullWidth
//                     size="small"
//                     autoComplete="off"
//                     variant="outlined"
//                     value={jobPost.job_location}
//                   ></TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <InputLabel
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       fontWeight: 700,
//                     }}
//                   >
//                     Application Deadline
//                   </InputLabel>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     required
//                     name="deadline"
//                     fullWidth
//                     type="date"
//                     size="small"
//                     autoComplete="off"
//                     variant="outlined"
//                   >
//                     {jobPost.deadline}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12} sm={6} />
//                 <Grid item xs={12} sm={5} />
//                 <Grid item xs={12} sm={4}>
//                   <Button
//                     variant="contained"
//                     sx={{ color: "#ff781f" }}
//                     type="submit"
//                   >
//                     Save
//                   </Button>
//                 </Grid>
//                 <Grid item xs={12} sm={5} />
//               </Grid>
//             </Box>
//           ))}
//         </Paper>
//       </React.Fragment>
//     </>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UpdateJobPost(props) {
//   const [formData, setFormData] = useState({
//     job_name: '',
//     job_type: '',
//     perks: '',
//     eligibility: '',
//     department: '',
//     company_name: '',
//     deadline: '',
//     duration: '',
//     description: '',
//     job_location: '',
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:4000/auth/get_field_from_jobPost2/${props.job_id}`)
//       .then(res => {
//         setFormData(res.data[0]);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   }, [props.job_id]);

//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios.put(`http://localhost:4000/auth/update_job_post/${props.job_id}`, formData)
//       .then(res => {
//         console.log(res.data.message);
//         // do something else, such as redirect to the job post page
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Job Name:
//         <input type="text" name="job_name" value={formData.job_name} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Job Type:
//         <input type="text" name="job_type" value={formData.job_type} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Perks:
//         <input type="text" name="perks" value={formData.perks} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Eligibility:
//         <input type="text" name="eligibility" value={formData.eligibility} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Department:
//         <input type="text" name="department" value={formData.department} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Company Name:
//         <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Deadline:
//         <input type="text" name="deadline" value={formData.deadline} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Duration:
//         <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Description:
//         <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
//       </label>
//       <br />
//       <label>
//         Job Location:
//         <input type="text" name="job_location" value={formData.job_location} onChange={handleChange} />
//       </label>
//       <br />
//       <button type="submit">Update</button>
//     </form>
//   );
// }
// export default UpdateJobPost;


{/* <TextField
id="institute"
name="institute"
label="Institute"
value={formData.institute}
onChange={handleChange}
/>
<TextField
id="dept"
name="dept"
label="Department"
value={formData.dept}
onChange={handleChange}
/>
<TextField
id="course"
name="course"
label="Course"
value={formData.course}
onChange={handleChange}
/>
<TextField
id="sem"
name="sem"
label="Semester"
value={formData.sem}
onChange={handleChange}
/>
<TextField
id="marks"
name="marks"
label="Marks"
value={formData.marks}
onChange={handleChange}
/>
<TextField
id="reg_no"
name="reg_no"
label="Registration Number"
value={formData.reg_no}
onChange={handleChange}
/>
<TextField
id="prevInstitute"
name="prevInstitute"
label="Previous Institute"
value={formData.prevInstitute}
onChange={handleChange}
/>
<TextField
id="prevDept"
name="prevDept"
label="Previous Department"
value={formData.prevDept}
/>
<TextField
name="prevDegree"
label="Previous Degree"
value={formData.prevDegree}
onChange={handleChange}
/>
<TextField
id="prevMarks"
name="prevMarks"
label="Previous Marks"
value={formData.prevMarks}
onChange={handleChange}
/>
<TextField
id="prevReg_no"
name="prevReg_no"
label="Previous Registration Number"
value={formData.prevReg_no}
onChange={handleChange}
/>
<input
accept="image/*,application/pdf"
style={{ display: "none" }}
id="marksheet"
name="marksheet"
type="file"
onChange={handleFileChange}
/>

<input
accept="image/*,application/pdf"
style={{ display: "none" }}
id="prevMarksheet"
name="prevMarksheet"
type="file"
onChange={handleFileChange}
/>

<TextField
id="cerInstitute"
name="cerInstitute"
label="Certification Institute"
value={formData.cerInstitute}
onChange={handleChange}
/> */}







<Dialog
open={showDialog}
onClose={handleAcceptCancel}
fullWidth={true}
maxWidth="sm"
>
<DialogTitle style={{ backgroundColor: "#2196f3", color: "white" }}>
  Confirmation
</DialogTitle>
<DialogContent>
  <DialogContentText padding="20px">
    Are you sure you want to accept this student for the job? Enter
    status below:
  </DialogContentText>
  <TextField
    label="Status"
    value={status}
    onChange={handleStatusChange}
    style={{ marginBottom: "10px" }}
  />
</DialogContent>
<DialogActions style={{ padding: "16px" }}>
  <Button
    onClick={handleAcceptCancel}
    color="secondary"
    style={{ color: "#f44336" }}
  >
    Cancel
  </Button>
  <Button
    onClick={handleAcceptConfirm}
    color="primary"
    variant="contained"
    style={{ backgroundColor: "#2196f3", color: "white" }}
  >
    Confirm
  </Button>
</DialogActions>
</Dialog>