import request from "./request";

// tslint:disable-next-line
export const getTopic = () => request.get({url: '/getTopic'})
