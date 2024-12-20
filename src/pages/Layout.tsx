import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useUserData } from "../api/getUserData";
import Loading from "../Loading";
import { useAppDataStore } from "../store/AppDataStore";

const Layout = () => {
  const navigate = useNavigate();
  const token = useAppDataStore((state) => state.token);
  const { data, isLoading, isError } = useUserData(token);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("login"))) {
      navigate("/login");
    }
    if (isError) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && data && <Header data={data?.data} />}
      {!isLoading && data && <Outlet context={data?.data} />}
    </>
  );
};

export default Layout;
