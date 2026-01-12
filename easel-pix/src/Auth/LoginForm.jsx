import axios from "axios";

const LoginForm = (authenticate) => {
  const login = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        user
      );
      console.log(data);
      window.localStorage.setItem("token", data.token);
      //authenticate(window.localStorage.getItem("token"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={login}>
      <div>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <button type="submit"> Login </button>
    </form>
  );
};

export default LoginForm;

/* Log Out Button Code:
  Place this code under the declared component:
    const logOut = () => {
      setUser({});
      };
<button onClick={() => {logOut()}}>Log Out</button> */
