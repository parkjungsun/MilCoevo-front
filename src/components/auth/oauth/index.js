import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

import { setToken } from "../../../modules/token";

function Oauth({ history }) {
  const dispatch = useDispatch();

  const token = new URLSearchParams(useLocation().search).get("token");

  useEffect(() => {
    dispatch(setToken(token));
  });

  return <Navigate to="/members" />;
}

export default Oauth;
