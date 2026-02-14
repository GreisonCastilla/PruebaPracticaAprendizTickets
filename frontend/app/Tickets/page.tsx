"use client";

import { user } from "../services/user";
import Hero from "../ui/Hero";
import { showToast } from "nextjs-toast-notify";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import NotFound from "../ui/views/NotFound";
import Admin from "../ui/views/Admin";
import Petitioner from "../ui/views/Petitioner";
import { useState } from "react";



export default function Page() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  const send = async (userid: string) => {
      try {
        const data = await user(userid);
        showToast.success("Usuario encontrado", {
          duration: 4000,
          progress: false,
          position: "top-right",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error(error);
        showToast.error("Se produjo un error al buscar el usuario", {
          duration: 4000,
          progress: false,
          position: "top-right",
          transition: "bounceIn",
          icon: "",
          sound: true,
        });
        return null;
      }
    };

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      router.push("/"); // redirige si no está logueado
      return;
    }
    const userid = jwtDecode<{ user_id: string }>(token).user_id;
    send(userid);
  }, []);


  return (
    <div>
      <div className="h-full">
        <Hero />
      </div>
      {userData && userData.role === "PETITIONER" && <Petitioner user={userData} />}
      {userData && userData.role === "ADMIN" && <Admin />}
      {!userData && <NotFound />}
      
    </div>
  );
}
