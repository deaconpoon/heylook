import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import uiReducer from '@/store/slices/uiSlice';
import sessionReducer from '@/store/slices/sessionSlice';
import userReducer from '@/store/slices/userSlice';
import { themeMiddleware } from '@/store/middleware/themeMiddleware';

// Import state types to correctly type RootState
import type { UiState } from '@/store/slices/uiSlice';
import type { SessionState } from '@/store/slices/sessionSlice';
import type { UserState } from '@/store/slices/userSlice';

// Create explicit RootState type with known shapes
export interface RootState {
  ui: UiState;
  session: SessionState;
  user: UserState;
}

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    session: sessionReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(themeMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Inferred type: { ui: UiState, session: SessionState, user: UserState }
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>; 