import { useState } from "react";
import { getErrorMessage } from "@/utils/Errors";
import { IRegister } from "@/interfaces/auth/IRegister";
import { UserService } from "@/services/front/UserService";

const useRegister = () => {
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [statusRegister, setStatusRegister] = useState<string | null>(null);

  const handleRegister = ({ name, email, password }: IRegister) => {
    setLoadingRegister(true);
    UserService.Register({ name, email, password })
      .then(() => {
        setStatusRegister("ok");
      })
      .catch((error) => {
        console.error("error", error);
        setStatusRegister(getErrorMessage(error));
      })
      .finally(() => setLoadingRegister(false));
  };

  return { loadingRegister, handleRegister, statusRegister };
};

export default useRegister;
