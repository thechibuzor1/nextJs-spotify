import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Center from "../Components/Center";
import { getSession } from "next-auth/react";
import Sidebar from "../Components/Sidebar";
import Player from "../Components/Player";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
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
