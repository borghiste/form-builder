
import { act } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";


// components
import LoginPage from '../../routes/LoginPage';

const renderPage = () => {
    render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    );
}

describe("LoginPage component", () => {

   it('should log user in successfully', async () => {
        renderPage();

   });
   
    });
