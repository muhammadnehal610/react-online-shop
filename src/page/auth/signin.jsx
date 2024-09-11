import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleBtn from "./googleBtn";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Button, Spinner } from "@nextui-org/react";
function Signin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleEmail(e) {
    setemail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();
  const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result=>", result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user=>", user);
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("errorCOde=>", errorCode, "errormessg=>", errorMessage);

        // ...
      });
  };

  const handleSignInWIthEmail = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/");
        setLoading(false);
      });
    } catch (err) {
      alert(err);
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
                      Login
                    </p>
                    <div
                      className="flex justify-center w-full"
                      onClick={signWithGoogle}
                    >
                      <GoogleBtn />
                    </div>
                    <div className="flex justify-center text-2xl font-bold my-3">
                      <span>OR</span>
                    </div>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div
                          data-mdb-input-init=""
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          <input
                            onChange={handleEmail}
                            value={email}
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="Enter Your Email"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div
                          data-mdb-input-init=""
                          className="form-outline flex-fill mb-0"
                        >
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            value={password}
                            onChange={handlePassword}
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Enter Your Password"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-end  mb-3 mb-lg-4">
                        <button
                          type="button"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-primary btn-lg w-full"
                          onClick={handleSignInWIthEmail}
                        >
                          Login
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <p>
                          You don't have an account{" "}
                          <Link className="text-blue-500" to={"/auth/signup"}>
                            Signup
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
export default Signin;
