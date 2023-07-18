import './App.css';
import { Admin_login } from './component/Login/Admin_login';
import { Getstarted } from './component/Getstarted/Getstarted';
import Nav from './component/Nav/Nav'
import Nav2 from './component/Nav/Nav2';
import Student_login from './component/Login/Student_login';
import Homepage from './component/Homepage/Homepage';
import React, { Component, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stu_reg } from './component/Registration/StudentRegistration/Stu_reg';
import { Admin_reg } from './component/Registration/Admin_reg';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { Stu_pro } from './component/StudentProfile/Stu_pro';
import { Stu_dash } from './component/StudentInterface/Stu_dash';
import { Admin_dash } from './component/AdminInterface/Admin_dash';
import { Add_admin } from './component/AdminInterface/Add_admin';
import Approve_Student from './component/AdminInterface/Approve_Student';
import ApprovedStudent from "./component/AdminInterface/ApprovedStudent";
import Approve_Company from "./component/AdminInterface/Approve_Company";
import ApprovedCompany from "./component/AdminInterface/ApprovedCompany";
import { AddEvent } from './component/AdminInterface/AddEvent';
import { GetAllAdmin } from './component/AdminInterface/GetAllAdmin'
import Nav4 from './component/Nav/Nav4'
import { AdminProfilePictureProvider, CompanyAddressContextProvider, CompanyIdProvider, CompanyLogoProvider, CompanyNameContextProvider, DepartmentContextProvider, HomepageidProvider, UsernameContexProvider } from './component/StudentProfile/contexts/StepperContext';
import { UseContextProvider } from './component/StudentProfile/contexts/StepperContext';
import { EventCalender } from './component/AdminInterface/EventCalender';
import { Company_reg } from './component/Registration/Company_reg/Company_reg';
import { Company_pro } from './component/Company_profile/Company_pro';
import { CompanyDash } from './component/CompanyInterface/CompanyDash';
import Company_login from './component/Login/Company_login';
import Nav_company from './component/Nav/Nav_company';
import { Admin_pro } from './component/Admin_Profile/Admin_pro';
import Admin from './component/Nav/Admin';
import { GetAllAdminHome } from './component/AdminInterface/GetAllAdminHome';
import GetAllCompaniesHome from './component/AdminInterface/GetAllCompaniesHome';
import GetAllCompanies from './component/AdminInterface/GetAllCompanies';
import { Departments } from './component/AdminInterface/Departments';
import ImageGalary from './component/Homepage/ImageGalary';
import JobPost from './component/CompanyInterface/JobPost';
import JobTab from './component/CompanyInterface/JobTab';
import { JobDrivesCompany } from './component/CompanyInterface/JobDrivesCompany';
import { CompanyNameContext } from './component/StudentProfile/contexts/StepperContext';
import JobPost2 from './component/CompanyInterface/JobPost2';
import { JobDrivesStudent } from './component/CompanyInterface/JobDrivesStudent';
import { JobDrivesMe } from './component/CompanyInterface/JobDrivesMe';
import { AppliedStudents } from './component/CompanyInterface/AppliedStudents';
import { ManageApplicant } from './component/CompanyInterface/ManageApplicant';
import { StudentProfile } from './component/StudentInterface/StudentProfile';
import { MyApplications } from './component/StudentInterface/MyApplications';
import TotalStudent from './component/AdminInterface/TotalStudent';
import { ManageHomepage } from './component/AdminInterface/ManageHomepage';
import { StudentChart } from './component/AdminInterface/Charts/StudentChart';
import { EventList } from './component/AdminInterface/EventList';
import { EventAndNews } from './component/Homepage/EventAndNews';
import { LineChart } from './component/AdminInterface/Charts/LineChart';
import { EventAndNewsStu } from './component/StudentInterface/EventAndNewsStu';
import GetAllCompaniesStudent from './component/StudentInterface/GetAllCompaniesStudent';
import { StudentPlaced } from './component/AdminInterface/StudentPlaced';
function App() {


  return (
    <div className="App">
      <UsernameContexProvider>
        <UseContextProvider>
          <CompanyNameContextProvider>
            <CompanyAddressContextProvider>
              <DepartmentContextProvider>
                <AdminProfilePictureProvider>
                  <CompanyLogoProvider>
                    <HomepageidProvider>
                      <CompanyIdProvider>
                        <Routes>
                          <Route path="/" element={<Getstarted />} />
                          <Route path="/Homepage" element={<Homepage />} />
                          <Route path="/Admin_login" element={<Admin_login />} />
                          <Route path="/Stu_reg" element={<Stu_reg />} />
                          <Route path="/Stu_pro" element={<Stu_pro />}></Route>
                          <Route path="/Company_pro" element={<Company_pro />} />
                          <Route path="/Stu_dash" element={<Stu_dash />} />
                          <Route path="/Admin_dash" element={<Admin_dash />} />
                          <Route path="/Add_admin" element={<Add_admin />} />
                          <Route path="/Student_login" element={<Student_login />} />
                          <Route path="/Company_login" element={<Company_login />} />
                          <Route path="/Nav" element={<Nav />} />
                          <Route path="/Approve_Student" element={<Approve_Student />} />
                          <Route path="/ApprovedStudent" element={<ApprovedStudent />} />
                          <Route path="/Approve_Company" element={<Approve_Company />} />
                          <Route path="/ApprovedCompany" element={<ApprovedCompany />} />
                          <Route path="/Nav2" element={<Nav2 />} />
                          <Route path="/Admin" element={<Admin />} />
                          <Route path='/AddEvent' element={<AddEvent />} />
                          <Route path="/GetAllAdmin" element={<GetAllAdmin />} />
                          <Route path='/Nav4' element={<Nav4 />} />
                          <Route path='/EventCalender' element={<EventCalender />} />
                          <Route path='/Company_reg' element={<Company_reg />} />
                          <Route path="/CompanyDash" element={<CompanyDash />} />
                          <Route path="/Nav_company" element={<Nav_company />} />
                          <Route path="/Admin_pro" element={<Admin_pro />} />
                          <Route path="/GetAllAdminHome" element={<GetAllAdminHome />} />
                          <Route path="/GetAllCompaniesHome" element={<GetAllCompaniesHome />} />
                          <Route path="/GetAllCompanies" element={<GetAllCompanies />} />
                          <Route path="/Departments" element={<Departments />} />
                          <Route path="/ImageGalary" element={<ImageGalary />} />
                          <Route path="/JobPost" element={<JobPost />} />
                          <Route path="/JobTab" element={<JobTab />} />
                          <Route path="/JobDrivesCompany" element={<JobDrivesCompany />} />
                          <Route path="/JobDrivesStudent" element={<JobDrivesStudent />} />
                          <Route path="/JobPost2" element={<JobPost2 />} />
                          <Route path="/JobDerivesMe" element={<JobDrivesMe />} />
                          <Route path="/AppliedStudents/:job_id" element={<AppliedStudents />} />
                          <Route path="/ManageApplicant/:job_id" element={<ManageApplicant />} />
                          <Route path="/StudentProfile" element={<StudentProfile />} />
                          <Route path="/TotalStudent" element={<TotalStudent />} />
                          <Route path="/MyApplicatons" element={<MyApplications />} />
                          <Route path="/ManageHomepage" element={<ManageHomepage />} />
                          <Route path="/StudentChart" element={<StudentChart />} />
                          <Route path="/EventList" element={<EventList />} />
                          <Route path="/EventAndNews" element={<EventAndNews />} />
                          <Route path="/EventAndNewsStu" element={<EventAndNewsStu />} />
                          <Route path="/LineChart" element={<LineChart />} />
                          <Route path="/GetAllCompaniesStudent" element={<GetAllCompaniesStudent />} />
                          <Route path="/StudentPlaced" element={<StudentPlaced />} />
                        </Routes>
                      </CompanyIdProvider>
                    </HomepageidProvider>
                  </CompanyLogoProvider>
                </AdminProfilePictureProvider>
              </DepartmentContextProvider>
            </CompanyAddressContextProvider>
          </CompanyNameContextProvider>
        </UseContextProvider>
      </UsernameContexProvider>

    </div>
  );
}

export default App;
