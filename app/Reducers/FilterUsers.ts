
import { IF_FilterUserArray } from '@/types/Global';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



// the initial value of the state
const initialState: IF_FilterUserArray = {
    FilterValue: 'All',
    SearchValue: '',
    Refresh: false,
};


// slice

const FilterUserSlice = createSlice({
    name: 'filteruser',
    initialState,
    reducers: {
        SetFilterValue: (state, action: PayloadAction<string>) => {
            if (state.FilterValue !== action.payload) {
                state.FilterValue = action.payload
            }
        },
        SetSearchValue: (state, action: PayloadAction<string>) => {

            state.SearchValue = action.payload

        },
        setRefresh: (state) => {
            state.Refresh = !state.Refresh
        }
    },
});

export const { SetFilterValue, SetSearchValue, setRefresh  } = FilterUserSlice.actions;
export default FilterUserSlice.reducer;