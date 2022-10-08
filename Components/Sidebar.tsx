import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const SpotifyApi = useSpotify();
  const [playlist, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const { data: session } = useSession();
  useEffect(() => {
    if (SpotifyApi.getAccessToken()) {
      SpotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, SpotifyApi]);

  return (
    <div className="text-gray-500 p-5 border-r border-gray-900
     overflow-y-scroll h-screen scrollbar-hide
      text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
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
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* playlists */}

        {playlist.map((item) => (
          <p
            onClick={() => setPlaylistId(item.id)}
            key={item.id}
            className="cursor-pointer hover:text-white"
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;