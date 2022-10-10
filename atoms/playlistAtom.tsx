import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistAtomState",
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "",
});

export const savedSongsState = atom({
  key: "savedSongsAtomState",
  default: null,
});

export const showSideBarState = atom({
  key: "showSideBarState",
  default: false,
});
