import { atom } from "recoil";

const jobsAtom = atom({
	key: "jobsAtom",
	default: [],
});

export default jobsAtom;