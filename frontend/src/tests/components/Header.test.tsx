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


describe('Header', () => {
    it('should render header component', () => {
        render(
            <Provider store={store}>

            <Header/>
            </Provider>
        )
    })
})





