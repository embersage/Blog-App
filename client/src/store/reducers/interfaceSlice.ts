import { createSlice } from '@reduxjs/toolkit';

interface InterfaceState {
  isOpenedModalWindow: boolean;
}

const initialState: InterfaceState = {
  isOpenedModalWindow: false,
};

const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setIsOpenedModalWindow: (state, action) => {
      state.isOpenedModalWindow = action.payload;
    },
  },
});

export const { setIsOpenedModalWindow } = interfaceSlice.actions;

export default interfaceSlice.reducer;
