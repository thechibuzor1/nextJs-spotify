import React from "react";
import { useRecoilValue } from "recoil";
import { savedSongsState } from "../atoms/playlistAtom";
import Song from "./Song";

function SavedSongs() {
  const playlist = useRecoilValue(savedSongsState);
  return (
    <div className="px-8  flex flex-col space-y-1 pb-20 text-white">
      {playlist?.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
}

export default SavedSongs;
