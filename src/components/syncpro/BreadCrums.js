import { Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";





export const Breadcrumbs = () => {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(location.pathname.toUpperCase().split('/').slice(2));
  }, [location.pathname, setCurrentPath])

  return (
    <p className="text-start mx-5 sm:mx-0 sm:mt-0 font-medium"><span className="text-gray-400">SYNCPRO</span> / {currentPath}</p>
  );
}