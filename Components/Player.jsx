import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { debounce } from "lodash";
import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "@heroicons/react/solid";

function Player() {
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const SpotifyApi = useSpotify();
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      SpotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        SpotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    SpotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        SpotifyApi.pause();
        setIsPlaying(false);
      } else {
        SpotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  useEffect(() => {
    if (SpotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, SpotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      SpotifyApi.setVolume(volume);
    }, 500),
    []
  );

  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-gray-900 grid
     text-white grid-cols-3 text-xs md:text-base px-2 md:px-8"
    >
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
        <RewindIcon
          /*  onClick={()=>SpotifyApi.skipToPrevious()} */ className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
        {isPlaying ? (
          <PauseIcon
            onClick={handlePlayPause}
            className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />
        ) : (
          <PlayIcon
            onClick={handlePlayPause}
            className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
          />
        )}

        <FastForwardIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
        <ReplyIcon className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeOffIcon
          onClick={() => {
            volume > 0 && setVolume(volume - 10);
          }}
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          onClick={() => {
            volume < 100 && setVolume(volume + 10);
          }}
          className="h-5 w-5 cursor-pointer hover:scale-125 transition transform duration-100 ease-out"
        />
      </div>
    </div>
  );
}

export default Player;
