import type { NextPage } from "next";
import Center from "../Components/Center";
import { getSession } from "next-auth/react";
import Sidebar from "../Components/Sidebar";
import Player from "../Components/Player";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const Home: NextPage = () => {
  useEffect(() => {
    toast(
      "For it to work, make sure spotify is currently running on your device.",
      {
        icon: "🧍",
      }
    );
  }, []);
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Toaster />
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
