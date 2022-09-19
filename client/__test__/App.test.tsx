// Imports
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import user from "@testing-library/user-event";
import React from "react";
import App from "../src/App";
import { MemoryRouter as Router } from "react-router-dom";

test("Renders main page correctly", async () => {
  expect(render(
    <RecoilRoot>
      <Router>
        <App />
      </Router>
    </RecoilRoot>
  )).toBeTruthy();
});
