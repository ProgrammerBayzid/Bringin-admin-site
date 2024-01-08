export const setAuthToken = (user) => {
  const currentUser = {
    email: user.email,
  };
  fetch("https://rsapp.unbolt.co/admin_jwt", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("admin_token", data.token);
    });
};
