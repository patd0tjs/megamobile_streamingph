import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", {});
  });
  return <></>;
};

export default Redirection;
