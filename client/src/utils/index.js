const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CreateOrGetUser = async (data, addUser) => {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();
  const { picture, access_token } = resData;
  addUser({ picture, access_token });
};
