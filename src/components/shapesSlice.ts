import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShapeCollection, ShapeFeature } from "../types";

interface ShapesState {
  items: ShapeCollection;
  loading: boolean;
  error: string | null;
}

const initialState: ShapesState = {
  items: [],
  loading: false,
  error: null
};

const shapesSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setShapes(state, action: PayloadAction<ShapeCollection>) {
      state.items = action.payload;
      state.loading = false;
    },
    addShape(state, action: PayloadAction<ShapeFeature>) {
      state.items.push(action.payload);
    },
    removeShape(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        s => s.properties.id !== action.payload
      );
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { startLoading, setShapes, addShape, removeShape, setError } =
  shapesSlice.actions;

export default shapesSlice.reducer;
