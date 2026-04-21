import React from "react";
import { BrowserRouter } from "react-router-dom";
import FormsList from "../../routes/FormList";
import store from "../../app/store";

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
});
