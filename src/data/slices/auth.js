import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  initialState: {
    access_token: "",
    refresh_token: "",
    code: "",
    secret: "",
    redirect: "",
    grant_type: "authorization_code",
  },
  reducers: {},
});
