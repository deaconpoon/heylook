import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface UiState {
  theme: Theme;
  sidebarOpen: boolean;
  activeToolId: string | null;
  modals: {
    [key: string]: boolean;
  };
}

const initialState: UiState = {
  theme: 'light',
  sidebarOpen: true,
  activeToolId: null,
  modals: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveTool: (state, action: PayloadAction<string | null>) => {
      state.activeToolId = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
    toggleModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = !state.modals[action.payload];
    },
  },
});

// Actions
export const {
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setActiveTool,
  openModal,
  closeModal,
  toggleModal,
} = uiSlice.actions;

// Selectors
// We'll properly type these when we import them
export const selectTheme = (state: { ui: UiState }) => state.ui.theme;
export const selectSidebarOpen = (state: { ui: UiState }) => state.ui.sidebarOpen;
export const selectActiveTool = (state: { ui: UiState }) => state.ui.activeToolId;
export const selectModalOpen = (modalId: string) => (state: { ui: UiState }) => 
  state.ui.modals[modalId] || false;

export default uiSlice.reducer; 