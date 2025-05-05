import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../routes/LoginPage';

import {BrowserRouter, useNavigate} from 'react-router-dom';


describe('LoginPage', ()=> {
    it('should render a login form', () => {
        render(
            <BrowserRouter>
        <LoginPage/>
            </BrowserRouter>);
            
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
      
    });
    
})


describe('login form', () => {
    it('should log user in if credentials are correct', async () => {
        

        render(
            <BrowserRouter>
        <LoginPage/>
        </BrowserRouter>)

        const emailInput = await screen.findByTestId('email-input');

         const passwordInput = await screen.findByTestId('password-input');

         const buttonSubmit =  screen.getByRole('button', {name: 'submit'})

         
         //insert credentials
         
             fireEvent.change(  emailInput, { target: {value: 'test@example.com'}})
             fireEvent.change(  passwordInput, { target: {value: 'test'}})
            fireEvent.click(buttonSubmit)
  

    })
})