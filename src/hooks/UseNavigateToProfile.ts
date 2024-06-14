import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNavigateToProfile = () => {
  const navigate = useNavigate();

  const navigateToProfile = useCallback((userId: string) => {
    navigate(`/profile/${userId}`);
  }, [navigate]);

  return navigateToProfile;
};

export default useNavigateToProfile;
