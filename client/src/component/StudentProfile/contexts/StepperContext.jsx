import { createContext, useContext, useState } from "react";

export const StepperContext = createContext({});

export function UseContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <StepperContext.Provider value={{ userData, setUserData }}>
      {children}
    </StepperContext.Provider>
  );
}

//for username
export const UsernameContext = createContext({
  username: "",
  setUsername: null,
});

export const UsernameContexProvider = ({ children }) => {
  const [username, setUsername] = useState({});
  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
//for company name
export const CompanyNameContext = createContext({
  companyName: "",
  setCompanyName: null,
});

export const CompanyNameContextProvider = ({ children }) => {
  const [companyName, setCompanyName] = useState({});
  return (
    <CompanyNameContext.Provider value={{ companyName, setCompanyName }}>
      {children}
    </CompanyNameContext.Provider>
  );
};
// company address

export const CompanyAddressContext = createContext({
  companyAddress: "",
  setCompanyAddress: null,
});

export const CompanyAddressContextProvider = ({ children }) => {
  const [companyAddress, setCompanyAddress] = useState({});
  return (
    <CompanyAddressContext.Provider
      value={{ companyAddress, setCompanyAddress }}
    >
      {children}
    </CompanyAddressContext.Provider>
  );
};

//for department
export const DepartmentContext = createContext({
  department: "",
  setDepartment: null,
});
export const DepartmentContextProvider = ({ children }) => {
  const [department, setDepartment] = useState({});
  return (
    <DepartmentContext.Provider value={{ department, setDepartment }}>
      {children}
    </DepartmentContext.Provider>
  );
};

//for admin profile picture
export const AdminProfilePictureContext = createContext({
  photo: "",
  setPhoto: () => {},
});
export const AdminProfilePictureProvider = ({ children }) => {
  const [photo, setPhoto] = useState("");
  return (
    <AdminProfilePictureContext.Provider value={{ photo, setPhoto }}>
      {children}
    </AdminProfilePictureContext.Provider>
  );
};

//for company logo
export const CompanyLogoContext = createContext({
  logo: "",
  setLogo: () => {},
});
export const CompanyLogoProvider = ({ children }) => {
  const [logo, setLogo] = useState("");
  return (
    <CompanyLogoContext.Provider value={{ logo, setLogo }}>
      {children}
    </CompanyLogoContext.Provider>
  );
};

//for homepage id

export const HomepageidContext = createContext({
  id: "",
  setId: () => {},
});
export const HomepageidProvider = ({ children }) => {
  const [id, setId] = useState("");
  return (
    <HomepageidContext.Provider value={{ id, setId }}>
      {children}
    </HomepageidContext.Provider>
  );
};

//for company id

export const CompanyIdContext = createContext({
  id: "",
  setId: () => {},
});
export const CompanyIdProvider = ({ children }) => {
  const [id, setId] = useState("");
  return (
    <CompanyIdContext.Provider value={{ id, setId }}>
      {children}
    </CompanyIdContext.Provider>
  );
};
