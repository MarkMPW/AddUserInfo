"use client";

import {
  Box,
  Button,
  IconButton,
  Grid,
  Typography,
  FormControl,
  TextField,
  Paper,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import Appbar from "../app/components/Appbar";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

export default function Home() {
  
  interface UserFormState {
    firstName: string;
    lastName: string;
    email: string;
    cfPdpa: boolean;
    hobby: string[];
    gender: string;
    status: string;
    note: string;
  }

  const [userForm, setUserForm] = useState<UserFormState>({
    firstName: "",
    lastName: "",
    email: "",
    cfPdpa: false,
    hobby: [],
    gender: "male",
    status: "",
    note: "",
  })

  const [userInfo, setUserInfo] = useState<UserFormState[]>([]);

  const handleSubmit = (): void => {
    const newInfo = {
      firstName: userForm.firstName || "-",
      lastName: userForm.lastName,
      email: userForm.email || "-",
      cfPdpa: userForm.cfPdpa,
      hobby: userForm.hobby.length > 0 ? userForm.hobby : ["-"],
      gender: userForm.gender,
      status: userForm.status || "-",
      note: userForm.note || "-",
    }

    setUserInfo((prevInfo) => [...prevInfo, newInfo]);
    resetForm();
  }
  
  const handleDelete = (index: number) => {
    setUserInfo((prevInfo) => {
      const updateUserInfo = [...prevInfo]
      updateUserInfo.splice(index, 1)
      return updateUserInfo
    })
  }

  const resetForm = () => {
    setUserForm((prev) => ({
      firstName: "",
      lastName: "",
      email: "",
      cfPdpa: false,
      hobby: [],
      gender: "male",
      status: "",
      note: "",
    }))
  }

  const customHobbyOrder = ["Game", "Music", "Craft", "Reading"];

  const handleChange = (value: string | boolean, name: string) => {
    const newName = name as unknown as string;

    if (name === "hobby") {
      setUserForm((prev) => {
        let updatedHobby;
        if (prev.hobby.includes(value as string)) {
          updatedHobby = prev.hobby.filter((hobby) => hobby !== value);
        } else {
          updatedHobby = [...prev.hobby, value as string]
          updatedHobby.sort()
        }
        updatedHobby.sort((a, b) => {
          const indexA = customHobbyOrder.indexOf(a)
          const indexB = customHobbyOrder.indexOf(b)
          return indexA - indexB;
        })
        return {
          ...prev,
          [newName]: updatedHobby,
        }
      })
    } else {
      setUserForm((prev) => ({
        ...prev,
        [newName]: value,
      }))
    }
  }

  console.log({ userForm });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: grey[100],
      }}
    >
      <Appbar />

      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "65px",
          width: "100%",
          height: "100%",
          marginLeft: "-24px",
        }}
      >
        <Grid item md={5}>
          <Box
            sx={{
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Typography variant="h4">Profile management</Typography>
          </Box>
          <Paper sx={{ padding: "24px", margin: "24px" }}>
            <Box component="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    name="firstName"
                    variant="outlined"
                    value={userForm.firstName}
                    onChange={(event) =>
                      handleChange(event.target.value, event.target.name)
                    }
                    sx={{ width: "100%" }}
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    name="lastName"
                    variant="outlined"
                    value={userForm.lastName}
                    onChange={(event) =>
                      handleChange(event.target.value, event.target.name)
                    }
                    sx={{ width: "100%" }}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={userForm.email}
                    onChange={(event) =>
                      handleChange(event.target.value, event.target.name)
                    }
                    sx={{ width: "100%" }}
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userForm.cfPdpa}
                        value={userForm.cfPdpa}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) =>
                          handleChange(event.target.checked, event.target.name)
                        }
                      />
                    }
                    name="cfPdpa"
                    label="Comfirm PDPA"
                  ></FormControlLabel>
                </Grid>

                <Grid item>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    defaultValue="male"
                    value={userForm.gender}
                    onChange={(event) =>
                      handleChange(event.target.value, event.target.name)
                    }
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Etc"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Hobby
                    </FormLabel>
                    <FormGroup sx={{ display: "flex", flexFlow: "row wrap" }}>
                      <FormControlLabel
                        name="hobby"
                        control={
                          <Checkbox
                            value="Game"
                            checked={userForm.hobby.includes("Game")}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              handleChange(
                                event.target.value,
                                event.target.name
                              )
                            }
                          />
                        }
                        label="Game"
                      />
                      <FormControlLabel
                        name="hobby"
                        control={
                          <Checkbox
                            value="Music"
                            checked={userForm.hobby.includes("Music")}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              handleChange(
                                event.target.value,
                                event.target.name
                              )
                            }
                          />
                        }
                        label="Music"
                      />
                      <FormControlLabel
                        name="hobby"
                        control={
                          <Checkbox
                            value="Craft"
                            checked={userForm.hobby.includes("Craft")}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              handleChange(
                                event.target.value,
                                event.target.name
                              )
                            }
                          />
                        }
                        label="Craft"
                      />
                      <FormControlLabel
                        name="hobby"
                        control={
                          <Checkbox
                            value="Reading"
                            checked={userForm.hobby.includes("Reading")}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              handleChange(
                                event.target.value,
                                event.target.name
                              )
                            }
                          />
                        }
                        label="Reading"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      label="Status"
                      name="status"
                      value={userForm.status}
                      onChange={(event) =>
                        handleChange(event.target.value, event.target.name)
                      }
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorce">Divorce</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    name="note"
                    label="Note"
                    variant="outlined"
                    value={userForm.note}
                    onChange={(event) =>
                      handleChange(event.target.value, event.target.name)
                    }
                    sx={{ width: "100%" }}
                  ></TextField>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "16px" }}>
                  <Box
                    sx={{
                      gap: "16px",
                      display: "flex",
                      justifyContent: "end",
                      width: "100%",
                    }}
                  >
                    <Button variant="contained" onClick={resetForm}>
                      Reset
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          {userInfo.map((user, index) => (
            <Box key={index} sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
              <Paper sx={{ padding: "16px" }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{fontWeight: "600"}}>USER {index + 1}</Typography>
                    <IconButton onClick={()=> handleDelete(index)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography>
                        Name: {user.firstName} {user.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Email: {user.email}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Gender: {user.gender}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Hobby: {user.hobby.join(", ")}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Status: {user.status}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Note: {user.note}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        disabled
                        control={<Checkbox checked={user.cfPdpa} disabled/>}
                        label="Confirm PDPA"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          ))}
        </Grid>

      </Grid>
    </Box>
  );
}
