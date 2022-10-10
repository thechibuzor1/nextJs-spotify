import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ArrowCircleLeftIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  playlistIdState,
  playlistState,
  savedSongsState,
  showSideBarState,
} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import SavedSongs from "./SavedSongs";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

function Center() {
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-red-500",
    "from-green-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
    "from-orange-500",
    "from-violet-500",
  ];
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const SpotifyApi = useSpotify();
  const [show, setShow] = useRecoilState(showSideBarState);
  const [savedTracks, setSavedTracks] = useRecoilState(savedSongsState);

  useEffect(() => {
    return setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    {
      playlistId.length !== 0 &&
        SpotifyApi.getPlaylist(playlistId)
          .then((data) => {
            setPlaylist(data.body);
          })
          .catch((err) => console.log(err));
    }
    SpotifyApi.getMySavedTracks({ limit: 50, offset: 0 }).then((data) => {
      setSavedTracks(data.body.items);
    });
  }, [SpotifyApi, playlistId]);

  return playlistId.length !== 0 ? (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide transition transform duration-500 ease-in-out rounded-lg">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center
         bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer 
        rounded-full p-1 pr-2 text-white"
          onClick={() => signOut()}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}
      >
        <div className="text-white">
          {show ? (
            <ArrowCircleLeftIcon
              onClick={() => setShow(!show)}
              className="h-5 w-5"
            />
          ) : (
            <ArrowCircleRightIcon
              onClick={() => setShow(!show)}
              className="h5 w-5"
            />
          )}
        </div>
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  ) : (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide transition transform duration-500 ease-in-out rounded-lg">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center
          space-x-3 opacity-90 hover:opacity-80 cursor-pointer 
        rounded-full p-1 pr-2 text-white"
          onClick={() => signOut()}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user?.image}
            alt=""
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b from-blue-700 to-black  h-80 text-white p-8 `}
      >
        <div className="text-white">
          {show ? (
            <ArrowCircleLeftIcon
              onClick={() => setShow(!show)}
              className="h-5 w-5"
            />
          ) : (
            <ArrowCircleRightIcon
              onClick={() => setShow(!show)}
              className="h-5 w-5"
            />
          )}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            Liked Songs
          </h1>
        </div>
      </section>
      <div>
        <SavedSongs />
      </div>
    </div>
  );
}

export default Center;
