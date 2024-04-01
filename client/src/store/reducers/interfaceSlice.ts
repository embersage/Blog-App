import { createSlice } from '@reduxjs/toolkit';

interface InterfaceState {
  isOpenedModalWindow: boolean;
  search: string;
  pressedButton: string;
}

const initialState: InterfaceState = {
  isOpenedModalWindow: false,
  search: '',
  pressedButton: '',
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
  },
});

export const { setIsOpenedModalWindow, setSearch, setPressedButton } =
  interfaceSlice.actions;

export default interfaceSlice.reducer;
