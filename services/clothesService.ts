import config from '../config/config.json';
const DDBB_URL = config.DDBB_URL;

export const fetchAllClothes = async () => {
    const res = await fetch(`${DDBB_URL}/api/allClothes`);
    if (!res.ok) throw new Error("Error fetching all clothes");
    return res.json();
};
export const fetchClothesByTemp = async (temp) => {
    const res = await fetch(`${DDBB_URL}/api/getClothesByTemp?temp=${temp}`);
    if (!res.ok) throw new Error("Error fetching all clothes");
    return res.json();
};