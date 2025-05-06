import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/UI/Header';
import Header from '../../components/UI/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../app/store';
import * as UserAction from '../../features/UserSlice';
import {vi, expect, describe, it } from 'vitest';
import { useDispatch, } from 'react-redux';
import * as userActions from '../../features/UserSlice';


describe('Header', () => {
    it('should render header component', () => {
        render(
            <Provider store={store}>

            <Header/>
            </Provider>
        )
    })
})

const logoutSpy = vi.spyOn(userActions, 'Logout').mockReturnValue(() => (payload) => {payload})
describe('Header', () => {
    it('should log out user when log out button is clicked',  () => {
            const logOutButton =  screen.findByText('log out');
            fireEvent.click(logOutButton)
            expect(logoutSpy).toBeCalled();
    })
})