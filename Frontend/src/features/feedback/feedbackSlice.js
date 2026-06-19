import { createSlice} from '@reduxjs/toolkit'

// Initial state
const initialState = {
    feedbacks: '',
}

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        feedbackState:(state,action) => {
            state.feedbacks = action.payload;
        }
    }
})


export const {feedbackState} = feedbackSlice.actions;

export default feedbackSlice.reducer;# Build trigger Fri Jun 19 11:07:52 UTC 2026
