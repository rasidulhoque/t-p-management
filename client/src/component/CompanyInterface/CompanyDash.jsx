import React from "react";
import { Company_pro } from "../Company_profile/Company_pro";
import Nav_company from "../Nav/Nav_company";
import { Grid, Paper, Typography } from "@mui/material";

export const CompanyDash = () => {
  return (
    <>
      <Nav_company />
      <Grid container spacing={3}>
          <Grid item md={4} sm={6} xs={12} sx={{marginLeft: "16%"}}>
              <Paper sx={{p: 6}}>
                <Typography variant="p" sx={{color: "black"}}>Company Dashboard</Typography>
                
              </Paper>
          </Grid>
        </Grid>
    </>
  );
};
