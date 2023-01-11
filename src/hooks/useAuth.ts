import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../app/slices/AuthSlice";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser: any) => {
      if (!currentUser) navigate("/login");
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email!,
            name: currentUser.displayName!,
          })
        );
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
}
