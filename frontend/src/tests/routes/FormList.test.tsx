import React from "react";
import { BrowserRouter } from "react-router-dom";
import FormsList from "../../routes/FormList";
import store from "../../app/store";
import { modalContext } from '../../App';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {expect, it} from 'vitest'
import { Provider } from "react-redux";
import BasicButton from "../../components/UI/BasicButton";


describe('FormList component', () => {

  it('should render FormList component', () => {
    const mocksetNewFormClick = vi.fn();
    const mocknewFormClick = false;
    render(
      <Provider store={store}>
        <modalContext.Provider value={{mocknewFormClick , mocksetNewFormClick}}>
          <BrowserRouter>
          <FormsList/>
          </BrowserRouter>

        </modalContext.Provider>
      </Provider>

    )
  })

  vi.mock('user react-redux', () => ({
    useSelector: vi.fn(),
     useDispatch:  vi.fn(),
  }));

  it('should render New Form button for admin user', () => {



})
  


// import React from 'react';
// import { describe, it, expect, vi } from 'vitest';
// import '@testing-library/jest-dom';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { Provider, useSelector } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import store from '../../app/store';
// import FormsList from '../../routes/FormList';
// import { modalContext } from '../../App';
// import * as reactRedux from 'react-redux';

// import '@testing-library/jest-dom';
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../../features/UserSlice';
// import formsListReducer, { fetchformsList } from '../../features/formsListSlice';

// import formReducer from '../../features/formSlice';
// import themeReducer from '../../features/themeSlice';
// import { selectUser } from '../../features/UserSlice';

// import { after } from 'node:test';

// describe('FormsList Component', () => {

//   it('should render FormList component', () => {
//     const mocksetNewFormClick = vi.fn();
//     const mocknewFormClick = false;

//     render(
//       <Provider store={store}>
//         <modalContext.Provider value={{mocknewFormClick , mocksetNewFormClick}}>

//         <BrowserRouter>
//         <FormsList/>
//         </BrowserRouter>
//         </modalContext.Provider>
//       </Provider>
//     )
//   });



// describe('FormsList', () => {
//   const renderWithRole = (role: 'admin' | 'user') => {
//     const store = configureStore({
//       reducer: { user: userReducer },
//       preloadedState: { user: { role } }, 
//     });

//     return render(
//       <Provider store={store}>
//         <FormsList />
//       </Provider>
//     );
//   };

//   it('show button if user is admin', () => {
//     renderWithRole('admin');
//     expect(screen.getByText('+ New Form')).toBeInTheDocument();
//   });

//   it('non mostra il bottone se user normale', () => {
//     renderWithRole('user');
//     expect(screen.queryByText('+ New Form')).not.toBeInTheDocument();
//   });
// });

// });