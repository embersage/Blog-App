import { createSlice } from '@reduxjs/toolkit';

interface InterfaceState {
  isOpenedModalWindow: boolean;
  search: string;
  pressedButton: string;
  order: number;
}

const initialState: InterfaceState = {
  isOpenedModalWindow: false,
  search: '',
  pressedButton: '',
  order: 0,
};

const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setIsOpenedModalWindow: (state, action) => {
      state.isOpenedModalWindow = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPressedButton: (state, action) => {
      state.pressedButton = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setIsOpenedModalWindow, setSearch, setPressedButton, setOrder } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;
