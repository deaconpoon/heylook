import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Participant {
  id: string;
  name: string;
  role: 'owner' | 'editor' | 'viewer';
  isActive: boolean;
  cursorPosition?: { x: number; y: number };
}

export interface SessionState {
  id: string | null;
  projectId: string | null;
  targetUrl: string | null;
  figmaUrl: string | null;
  participants: Record<string, Participant>;
  isActive: boolean;
  startedAt: string | null;
  viewportSize: {
    width: number;
    height: number;
    deviceName: string;
  };
}

const initialState: SessionState = {
  id: null,
  projectId: null,
  targetUrl: null,
  figmaUrl: null,
  participants: {},
  isActive: false,
  startedAt: null,
  viewportSize: {
    width: 1280,
    height: 800,
    deviceName: 'Desktop',
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<{
      id: string;
      projectId: string;
      targetUrl: string;
      figmaUrl?: string;
    }>) => {
      state.id = action.payload.id;
      state.projectId = action.payload.projectId;
      state.targetUrl = action.payload.targetUrl;
      state.figmaUrl = action.payload.figmaUrl || null;
      state.isActive = true;
      state.startedAt = new Date().toISOString();
    },
    endSession: (state) => {
      state.isActive = false;
    },
    resetSession: () => initialState,
    updateViewportSize: (state, action: PayloadAction<{
      width: number;
      height: number;
      deviceName: string;
    }>) => {
      state.viewportSize = action.payload;
    },
    addParticipant: (state, action: PayloadAction<Participant>) => {
      state.participants[action.payload.id] = action.payload;
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      delete state.participants[action.payload];
    },
    updateParticipant: (state, action: PayloadAction<{
      id: string;
      updates: Partial<Participant>;
    }>) => {
      if (state.participants[action.payload.id]) {
        state.participants[action.payload.id] = {
          ...state.participants[action.payload.id],
          ...action.payload.updates
        };
      }
    },
    updateCursorPosition: (state, action: PayloadAction<{
      participantId: string;
      position: { x: number; y: number };
    }>) => {
      if (state.participants[action.payload.participantId]) {
        state.participants[action.payload.participantId].cursorPosition = action.payload.position;
      }
    },
  },
});

// Actions
export const {
  startSession,
  endSession,
  resetSession,
  updateViewportSize,
  addParticipant,
  removeParticipant,
  updateParticipant,
  updateCursorPosition,
} = sessionSlice.actions;

// Selectors with proper types
export const selectSessionId = (state: { session: SessionState }) => state.session.id;
export const selectIsSessionActive = (state: { session: SessionState }) => state.session.isActive;
export const selectTargetUrl = (state: { session: SessionState }) => state.session.targetUrl;
export const selectFigmaUrl = (state: { session: SessionState }) => state.session.figmaUrl;
export const selectViewportSize = (state: { session: SessionState }) => state.session.viewportSize;
export const selectParticipants = (state: { session: SessionState }) => state.session.participants;
export const selectParticipantById = (id: string) => (state: { session: SessionState }) => 
  state.session.participants[id];

export default sessionSlice.reducer; 