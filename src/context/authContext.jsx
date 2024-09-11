import { Spinner } from "@nextui-org/react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export const AuthContex = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {},
  });
  const [loading, setLoading] = useState(true);
  // Handle user state changes
  function onAuthChanged(user) {
    if (user) {
      console.log("usedr=>", user);

      setUser({
        isLogin: true,
        userInfo: {
          name: user?.displayName,
          image: user?.photoURL,
          email: user?.email,
        },
      });
    } else {
      setUser({
        isLogin: false,
        userInfo: {},
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <AuthContex.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="w-full h-80 flex justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContex.Provider>
  );
}
export default AuthContextProvider;
