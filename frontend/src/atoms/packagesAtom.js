import { atom } from "recoil";

const packagesAtom = atom({
	key: "packagesAtom",
	default: [],
});

export default packagesAtom;