import { useEffect, useState } from "react";
import { db } from "../config/fbconfig";
import { getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

export default function Initials({ uid }) {
  const [initials, setInitials] = useState("");
  useEffect(() => {
    const fetchInitials = async () => {
      if (uid) {
        const snap = await getDoc(doc(db, "users", uid));
        setInitials(snap.data()?.initials || "");
      }
    };
    fetchInitials();
  }, [uid]);
  return initials;
}
