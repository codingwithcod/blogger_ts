export const CreateOrGetUser = async (data, addUser) => {
  const response = await fetch("http://localhost:3991/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  const { picture, access_token } = resData;
  console.log("res data", resData);
  addUser({ picture, access_token });
};
