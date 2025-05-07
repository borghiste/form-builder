import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../routes/LoginPage';
import Header from '../../components/UI/Header';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../app/store';
import * as UserSlice from '../../features/UserSlice';
import {vi, expect, describe, it } from 'vitest';
import { useDispatch, } from 'react-redux';
import * as userActions from '../../features/UserSlice';


describe('LoginPage', ()=> {
    it('should render a login form', () => {

        render(
            <Provider store={store}>

            <BrowserRouter>
        <LoginPage/>
            </BrowserRouter>
            </Provider>)
            
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
      
    });
    
})
vi.mock('../../../store/UserSlice', () => {
    return {
      ...vi.importActual('../../../store/UserSlice'),
      Login: vi.fn(() => () => Promise.resolve())
    };
  });
  



  

  // Mock di useDispatch
  vi.mock('react-redux', async () => {
    const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
    return {
      ...actual,
      useDispatch: vi.fn(),
    };
  });
  
  describe('login form', () => {
    it('should log user in if credentials are correct', async () => {
     
      const mockDispatch = vi.fn();
      (useDispatch as unknown as vi.Mock).mockReturnValue(mockDispatch);
  
      vi.spyOn(UserSlice, 'Login').mockImplementation((payload) => payload);
  
      render(
        <Provider store={store}>

        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      
        </Provider>
        );
  
      const emailInput = await screen.findByTestId('email-input');
      const passwordInput = await screen.findByTestId('password-input');
      const buttonSubmit = screen.getByRole('button', { name: 'submit' });
  
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test' } });
      fireEvent.click(buttonSubmit);
  
      
    });
  });


  
  
  
  
  

// describe('logout action', () => {
//     it('should logout user', async () => {
//       render(<Header/>); 

//       const mockLogoutFunction = vi.fn();
  
//       const buttonLogout = screen.getByLabelText('logout');
//       fireEvent.click(buttonLogout);
  
     
//       expect(mockLogoutFunction).toHaveBeenCalled(); 
//       // oppure se viene reindirizzato:
//       expect(screen.getByText('You have been logged out')).toBeInTheDocument();
//     });
//   });
  