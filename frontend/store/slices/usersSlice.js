import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReqresUsersAPI, fetchReqresUserByIdAPI, importUserAPI, fetchSavedUsersAPI } from '@/services/userService';

export const fetchReqresUsers = createAsyncThunk(
  'users/fetchReqresUsers',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetchReqresUsersAPI(page);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const fetchAllReqresUsers = createAsyncThunk(
  'users/fetchAllReqresUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Primero obtener la primera página para saber cuántas páginas hay
      const firstPage = await fetchReqresUsersAPI(1);
      const totalPages = firstPage.totalPages;
      
      // Cargar todas las páginas en paralelo
      const promises = [];
      for (let page = 1; page <= totalPages; page++) {
        promises.push(fetchReqresUsersAPI(page));
      }
      
      const responses = await Promise.all(promises);
      
      // Combinar todos los usuarios
      const allUsers = responses.flatMap(response => response.data);
      
      return {
        data: allUsers,
        totalPages: totalPages,
        total: firstPage.total
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all users');
    }
  }
);

export const fetchReqresUserById = createAsyncThunk(
  'users/fetchReqresUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchReqresUserByIdAPI(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const importUser = createAsyncThunk(
  'users/importUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await importUserAPI(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to import user');
    }
  }
);

export const fetchSavedUsers = createAsyncThunk(
  'users/fetchSavedUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSavedUsersAPI();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch saved users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    reqresUsers: [],
    savedUsers: [],
    currentUser: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      totalPages: 1,
      total: 0,
    },
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReqresUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReqresUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.reqresUsers = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
      })
      .addCase(fetchReqresUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllReqresUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReqresUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.reqresUsers = action.payload.data;
        state.pagination = {
          page: 1,
          totalPages: 1,
          total: action.payload.total,
        };
      })
      .addCase(fetchAllReqresUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(importUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importUser.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.savedUsers.findIndex(
          (u) => u.id === action.payload.user.id
        );
        if (existingIndex === -1) {
          state.savedUsers.push(action.payload.user);
        }
      })
      .addCase(importUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSavedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.savedUsers = action.payload.users || action.payload.data || [];
      })
      .addCase(fetchSavedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReqresUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReqresUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data;
      })
      .addCase(fetchReqresUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;
