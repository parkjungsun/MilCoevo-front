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
import Redirect from "./auth/oauth/Redirect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/group" element={<Group />} exact={true}/>
        <Route path="/group/create" element={<GroupCreate />} exact={true} />
        <Route path="/group/register" element={<GroupRegister />} exact={true} />
        <Route path="/member/update" element={<UpdateMember />} exact={true} />
        <Route path="/members" element={<Members />} exact={true} />
        <Route path="/privacyExplain" element={<PrivacyExplain />} exact={true} />
        <Route path="/useExplain" element={<UseExplain />} exact={true} />
        <Route path="/register" element={<Register />} exact={true} />
        <Route path="/login" element={<Login />} exact={true} />
        <Route path="/oauth2/redirect" element={<Redirect />} exact={true} />
      </Routes>
    </>
  );
}

export default App;
