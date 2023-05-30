"use client";
import React from "react";
import { AppBar, Box, Typography } from "@mui/material";

function Appbar() {
  return (

    <AppBar position="fixed" >
        <Box sx={{display: 'flex', justifyContent: 'center', padding: '4px'}}>
            <Typography
                variant="h3"
            >
                User profile management System
            </Typography>
        </Box>
    </AppBar>

  );
}

export default Appbar;
