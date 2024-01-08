import { useEffect, useState } from "react";

const useWeb = (email) => {
  const [isWeb, setIsWeb] = useState(false);
  const [isloading, setisLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`https://rsapp.unbolt.co/user_web/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsWeb(data.isWeb);
          setisLoading(false);
        });
    }
  }, [email]);
  return [isWeb, isloading];
};

export default useWeb;
