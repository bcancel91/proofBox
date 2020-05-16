import api from "./api";

const userApi = (api) => {
  const signupUrl = "api/user/signup";
  const loginUrl = "api/user/login";
  const logoutUrl = "api/user/logout";

  const signup = (body) => {
    return api.post(signupUrl, {
      body: JSON.stringify(body),
    });
  };

  const login = (body) => {
    return api.post(loginUrl, {
      body: JSON.stringify(body),
    });
  };

  const logout = () => {
    return api.post(logoutUrl);
  };

  return {
    signup,
    login,
    logout,
    ...api,
  };
};

export default userApi(api);
