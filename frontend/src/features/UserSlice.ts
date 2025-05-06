import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
id: number | null,
name: string | null,
role: string | null
}

const savedUser = sessionStorage.getItem('user')

export const UserSlice = createSlice({
    name: 'User',
    initialState: savedUser ? JSON.parse(savedUser) : {
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
            Logout: (state) => {
                state.id = null,
                state.name = null,
                state.role = null,
                sessionStorage.removeItem('user')
            }
        },
    
})

export const selectUser = (state) => state.User

export const {Login, Logout} = UserSlice.actions

export default UserSlice.reducer