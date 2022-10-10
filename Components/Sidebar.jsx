import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, showSideBarState } from "../atoms/playlistAtom";
import { HeartIcon } from "@heroicons/react/solid";

function Sidebar() {
  const SpotifyApi = useSpotify();
  const [playlist, setPlaylist] = useState([]);
  const show = useRecoilValue(showSideBarState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const { data: session } = useSession();
  useEffect(() => {
    if (SpotifyApi.getAccessToken()) {
      SpotifyApi.getUserPlaylists({ limit: 50, offset: 0 }).then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, SpotifyApi]);

  return (
    <div
      className={`text-gray-500 p-5 border-r border-gray-900
     overflow-y-scroll h-screen scrollbar-hide
      text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] ${
        !show && "hidden"
      } md:inline-flex pb-36 transition transform duration-500 ease-in-out`}
    >
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button
          className={`flex items-center space-x-2 ${
            playlistId !== "" ? "text-blue-700" : "text-white"
          }  hover:text-white`}
          onClick={() => setPlaylistId("")}
        >
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2  text-green-700 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* playlists */}

        {playlist.map((item) => (
          <p
            onClick={() => setPlaylistId(item?.id)}
            key={item?.id}
            className={`cursor-pointer hover:text-white ${
              playlistId === item?.id && "text-white"
            }`}
          >
            {item?.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
