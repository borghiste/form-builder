import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoginPage from '../../routes/LoginPage';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { BrowserRouter } from 'react-router-dom';

describe('Login Page', () => {
    it('should render login form', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                <LoginPage/>
                </BrowserRouter>

            </Provider>
        )
    });
    





  }

    )



    
    
  
  
    
