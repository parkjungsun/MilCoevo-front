import { Route, Routes } from "react-router-dom";

import Group from "./group";
import GroupCreate from "./member/create"
import GroupRegister from "./member/register";
import UpdateMember from "./member/update";
import Members from "./member/members";
import PrivacyExplain from "./auth/register/PrivacyExplain";
import UseExplain from "./auth/register/UseExplain";
import Register from "./auth/register";
import Login from "./auth/login";
import Oauth from "./auth/oauth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/group/:id" element={<Group />} />
        <Route path="/group/create" element={<GroupCreate />} />
        <Route path="/group/register" element={<GroupRegister />} />
        <Route path="/member/:id/info" element={<UpdateMember />} />
        <Route path="/members" element={<Members />} />
        <Route path="/privacyExplain" element={<PrivacyExplain />} />
        <Route path="/useExplain" element={<UseExplain />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth/redirect/*" element={<Oauth />} />
        <Route path="/*" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
