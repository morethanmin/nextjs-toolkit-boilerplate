import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { User } from "../slices/user";

// 중복된 주소를 줄이는 방법
axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true; // front, back 간 쿠키 공유

// get, delete : data를 넘길 수 없다. 데이터를 넘길경우엔 쿼리스트링으로 넣어야한다.
// 쿼리스트링으로 back에 요청을 할 경우, back에서는 req.body가 아닌 req.query에서 정보를 볼 수 있다.

// post, put, fetch : data를 넘길 수 있다.

// 회원가입
export const signup = createAsyncThunk(
  "user/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/signup", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// 로그인
export const logIn = createAsyncThunk(
  "/user/signout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/signin", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// 로그아웃
export const logOut = createAsyncThunk("/signout", async () => {
  const response = await axios.post("/signout");
  return response.data;
});

// 로그인 상태 불러오기
export const loadUser = createAsyncThunk(
  "/user/load",
  async (data, { rejectWithValue }) => {
    // get의 두번째 인자에는 data가 아닌, withCredentials 자리지만 defaults로 넣었기때문에 생략
    try {
      const response = await axios.get("/user");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
