import { LoaderFunction, LoaderFunctionArgs, defer } from "react-router-dom";
import apiRequest from "./apiRequest";

type SinglePageLoaderParams = {
  id: string;
};

export const singlePageLoader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs<SinglePageLoaderParams>) => {
  const { id } = params;
  const res = await apiRequest("/posts/" + id);

  return res.data;
};

export const listPageLoader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const query = request.url.split("?")[1];
  const postPromise = await apiRequest("/posts?" + query);

  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader: LoaderFunction = async () => {
  const postPromise = await apiRequest("/user/profilePosts");
  const chatPromise = await apiRequest("/chats");

  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
