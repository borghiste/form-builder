import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
id: number | null,
name: String | null,
role: string | null
}

export const UserSlice = createSlice({
    name: 'User',
    initialState: {
           id: null,
                name: null,
                    role: null
            
         } as UserState | null,
        
        reducers: {
            Login: (state, action: PayloadAction<UserState>) => {
                state.id = action.payload.id,
                state.name = action.payload.name,
                state.role = action.payload.role

                
          

            },
        },
    
})

export const selectUser = (state) => state.User

export const {Login} = UserSlice.actions

export default UserSlice.reducer