import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../app/store';

import {vi, expect, describe, it } from 'vitest';
import { useDispatch, } from 'react-redux';
import * as userActions from '../../features/UserSlice';
import { useEffect } from 'react';


describe('FormList', () => {
    it('should render form list', () => {

        render(
        <Provider store={store}>
            <BrowserRouter>
            </BrowserRouter>

        </Provider>)
    })

    
})