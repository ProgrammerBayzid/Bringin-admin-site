import { useEffect, useState } from "react";

const useApp = (email) => {
  const [isApp, setIsApp] = useState(false);
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`https://rsapp.bringin.io/user_app/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsApp(data.isApp);
          setisLoading(false);
        });
    }
  }, [email]);
  return [isApp, isloading];
};

export default useApp;
