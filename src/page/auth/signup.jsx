import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { Spinner } from "@nextui-org/react";
import { AuthContex } from "../../context/authContext";

function Signup() {
  const [formInput, setFormInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    aggreCheak: false,
    successMsg: "",
  });

  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    aggreCheak: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContex); // Use the context
  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSignupForm = (e) => {
    e.preventDefault();

    let inputErr = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      aggreCheak: "",
    };

    if (!formInput.firstName) {
      inputErr.firstName = "Enter First Name";
    }
    if (!formInput.lastName) {
      inputErr.lastName = "Enter Last Name";
    }
    if (!formInput.email) {
      inputErr.email = "Enter Valid Email Address";
    }
    if (!formInput.password) {
      inputErr.password = "Password Should Not Be Empty";
    } else if (formInput.password.length < 8) {
      inputErr.password = "Password should be at least 8 characters long";
    }
    if (formInput.confirmPassword !== formInput.password) {
      inputErr.confirmPassword = "Password and Confirm Password do not match";
    }
    if (!formInput.aggreCheak) {
      inputErr.aggreCheak = "You must agree to the terms";
    }

    if (Object.values(inputErr).some((error) => error !== "")) {
      setFormError(inputErr);
      return;
    }

    handleCreateWithEmail();
  };

  const handleCreateWithEmail = async () => {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formInput.email,
        formInput.password
      );
      const user = userCredentials.user;

      await updateProfile(user, {
        displayName: `${formInput.firstName} ${formInput.lastName}`,
      });

      setUser({
        isLogin: true,
        userInfo: {
          name: `${formInput.firstName} ${formInput.lastName}`,
          email: user.email,
          image: user.photoURL || "", // Add a default image URL if necessary
        },
      });

      console.log("User created:", user);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5 relative">
                {loading ? (
                  <div>
                    <Spinner
                      className=" absolute  backdrop-blur-sm bg-white/5  w-full h-screen"
                      size="lg"
                    />{" "}
                  </div>
                ) : null}

                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSignupForm}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <div className="flex justify-between gap-3">
                            <div className="flex flex-col">
                              <label
                                className="form-label"
                                htmlFor="first-name"
                              >
                                First Name
                              </label>
                              <input
                                onChange={({ target }) => {
                                  handleUserInput(target.name, target.value);
                                }}
                                value={formInput.firstName}
                                name="firstName"
                                type="text"
                                id="first-name"
                                className="form-control"
                                placeholder="Muhammad"
                              />
                              <p className="error-mssg text-danger-500">
                                {formError.firstName}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <label className="form-label" htmlFor="last-name">
                                Last Name
                              </label>
                              <input
                                onChange={({ target }) => {
                                  handleUserInput(target.name, target.value);
                                }}
                                value={formInput.lastName}
                                name="lastName"
                                type="text"
                                id="last-name"
                                className="form-control"
                                placeholder="Nehal"
                              />
                              <p className="error-mssg text-danger-500">
                                {formError.lastName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          <input
                            onChange={({ target }) => {
                              handleUserInput(target.name, target.value);
                            }}
                            value={formInput.email}
                            name="email"
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="muhammadnehal610@gmail.com"
                          />
                          <p className="error-mssg text-danger-500">
                            {formError.email}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              handleUserInput(target.name, target.value);
                            }}
                            value={formInput.password}
                            name="password"
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="********"
                          />
                          <p className="error-mssg text-danger-500">
                            {formError.password}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                          <input
                            onChange={({ target }) => {
                              handleUserInput(target.name, target.value);
                            }}
                            value={formInput.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            placeholder="********"
                          />
                          <p className="error-mssg text-danger-500">
                            {formError.confirmPassword}
                          </p>
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          onChange={({ target }) => {
                            handleUserInput(target.name, target.checked);
                          }}
                          type="checkbox"
                          name="aggreCheak"
                          id="form2Example3c"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree to all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>

                        <p className="error-mssg text-danger-500">
                          {formError.aggreCheak}
                        </p>
                      </div>
                      <div className="d-flex justify-content-end mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-full"
                          disabled={loading}
                        >
                          {loading ? "Registering..." : "Register"}
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <p>
                          Already have an account?{" "}
                          <Link className="text-blue-500" to={"/auth/signin"}>
                            Login
                          </Link>{" "}
                        </p>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
