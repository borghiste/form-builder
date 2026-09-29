import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../../routes/Home';


// --------------------------------------------------------------------------- Utilities ---------------------------------------------------------------------------

const renderPage = () => {
  render(
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  );
};
//--------------- Mocks  ----------------
 typeof IntersectionObserver === 'undefined' && (global.IntersectionObserver = class {
    callback: IntersectionObserverCallback;
    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }
 });

 const SignUpButton = () => screen.getAllByRole('link', { name: /sign up/i });
 

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

beforeAll(() => {
    // Mock IntersectionObserver
    class MockIntersectionObserver {
        constructor(callback: IntersectionObserverCallback) {
            this.callback = callback;
        }
        observe() {
            // Simulate an intersection immediately
            this.callback([{ isIntersecting: true }] as IntersectionObserverEntry[], this);
        }
        disconnect() {}
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
})
describe('Home Page', () => {


    it('renders home page component', () => {
        renderPage();
        
    });

    it('direct to sign up page when clicking the sign up button', () => {
        renderPage();
        const signupButton = SignUpButton()[0];
        fireEvent.click(signupButton);
        expect(signupButton.getAttribute('href')).toBe('/signup');
       
    })
    

    
    });



