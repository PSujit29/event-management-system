import { useState } from "react";
import { AuthPanel, AuthLeftSidePanel, AuthRightSidePanel, FormContainer } from "../components/auth/AuthPanel";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  const [sidePanel, setSidePanel] = useState({ title: "Welcome", children: <p>Welcome</p>, imageUrl: "" });
  return (
    <>
      <AuthPanel>
        <AuthLeftSidePanel title={sidePanel.title} imageUrl={sidePanel.imageUrl}>
          {sidePanel.children}
        </AuthLeftSidePanel>

        <AuthRightSidePanel>
          <FormContainer>
            <Outlet context={{ sidePanel, setSidePanel }} />
          </FormContainer>
        </AuthRightSidePanel>
      </AuthPanel>
    </>
  );
}
