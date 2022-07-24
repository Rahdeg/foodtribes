import { fetchdata } from "../utils.js/fetchlocal";

const userinfo = fetchdata();

export const initialState={
    user: userinfo,
};