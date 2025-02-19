import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  language: string;
  isLoading: boolean;
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | null;
  };
}

const initialState: UIState = {
  theme: 'light',
  language: 'en',
  isLoading: false,
  notification: {
    show: false,
    message: '',
    type: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' | 'warning' }>) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideNotification: (state) => {
      state.notification = {
        show: false,
        message: '',
        type: null,
      };
    },
  },
});

export const { setTheme, setLanguage, setLoading, showNotification, hideNotification } = uiSlice.actions;
export default uiSlice.reducer;