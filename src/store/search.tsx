import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchHistory } from '../model/searchModel';
import { stat } from 'fs';

interface SearchState {
    keywords: SearchHistory[]
}
const initialState: SearchState = {
    keywords: []
};

const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchs: (state, action: PayloadAction<SearchHistory[]>) => {
            state.keywords = action.payload;
        },
        addKeyWord: (state, action: PayloadAction<SearchHistory>) => {
            const isExisted = state.keywords.some(x => x.keyWord === action.payload.keyWord);
            if (!isExisted) {
                state.keywords.push(action.payload);
            }
        },
        removeKeyWord: (state, action: PayloadAction<number>) => {
            state.keywords = state.keywords.filter(
                (item) => item.searchId !== action.payload
            );
        },
    },
});

export const { setSearchs, addKeyWord, removeKeyWord } = SearchSlice.actions;
export const selectKeywords = (state: { search: SearchState }) =>
    state.search.keywords;
export default SearchSlice.reducer;