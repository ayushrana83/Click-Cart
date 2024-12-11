import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, checkUser, createUser, logoutUser, resetPassword, resetPasswordRequest } from './AuthAPI';

const initialState = {
  loggedInUserToken : null,
  ifUser : false,
  status: 'idle',
  error : null,
  checkedUser : false,
  mailSent : false,
  passwordReset : false,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser" ,
  async (userData) =>{
    const response = await createUser(userData);
    return response.data; 
})

export const loginUserAsync = createAsyncThunk(
  "user/login" ,
  async (loginInfo , {rejectWithValue}) => {
    try
    {
      const response = await checkUser(loginInfo);
      return response.data;
    }
    catch(error)
    {
      console.log(error);
      return rejectWithValue(error);
    }
  }
)

export const checkAuthAsync = createAsyncThunk(
  "user/check" ,
  async () => {
      const response = await checkAuth();
      return response.data;
  }
)

export const logoutUserAsync = createAsyncThunk(
  "user/logout",
  async() =>{
    const response = await logoutUser();
    return response.data;
  }
)

export const resetPasswordRequestAsync = createAsyncThunk(
  "user/resetPasswordRequest",
  async(email) =>{
    const response = await resetPasswordRequest(email);
    return response.data;
  }
)
export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async(data , {rejectWithValue}) =>{
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
      rejectWithValue({error});
    }
  }
)


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers : (builder) =>{
    builder
    .addCase(createUserAsync.pending , (state) => {
      state.status = 'loading';
    })
    .addCase(createUserAsync.fulfilled , (state , action) => {
      state.status = 'idle' ;
      state.ifUser = true ;
      state.loggedInUserToken = action.payload;
    })
    .addCase(loginUserAsync.pending , (state) => {
      state.status = "loading";
    })
    .addCase(loginUserAsync.fulfilled , (state , action) => {
      state.status = "idle";
      state.ifUser = true ;
      state.loggedInUserToken = action.payload;
    })
    .addCase(loginUserAsync.rejected , (state , action) =>{
      state.status = "idle";
      state.error = action.error;
    })
    .addCase(logoutUserAsync.pending , (state) => {
      state.status = "loading";
    })
    .addCase(logoutUserAsync.fulfilled , (state , action) => {
      state.status = "idle";
      state.loggedInUserToken = null;
    })
    .addCase(checkAuthAsync.pending , (state ) => {
      state.status = "loading";
    })
    .addCase(checkAuthAsync.fulfilled , (state , action) => {
      state.status = "idle";
      state.ifUser = true ;
      state.loggedInUserToken = action.payload;
      state.checkedUser = true;
    })
    .addCase(checkAuthAsync.rejected , (state) => {
      state.status = "idle";
      state.checkedUser = true;
    })
    .addCase(resetPasswordRequestAsync.pending , (state) => {
      state.status = "loading";
    })
    .addCase(resetPasswordRequestAsync.fulfilled , (state , action) => {
      state.status = "idle";
      state.mailSent = true;
    })
    .addCase(resetPasswordAsync.pending , (state) => {
      state.status = "loading";
    })
    .addCase(resetPasswordAsync.fulfilled , (state , action) => {
      state.status = "idle";
      state.passwordReset = true;
    })
    .addCase(resetPasswordAsync.rejected , (state , action) => {
      state.status = "idle";
      state.error = action.error;
    })
  },
})


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectIfUser = (state) => state.auth.ifUser;
export const selectError = (state) => state.auth.error;
export const selectCheckedUser = (state) => state.auth.checkedUser;

export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default userSlice.reducer;
