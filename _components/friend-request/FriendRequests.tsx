import React from "react";
import FriendReq from "./FriendReq";

interface Colony {
  __v: number;
  _id: string;
  createdAt: string;
  email: string;
  fullname: string;
  updatedAt: string;
  username: string;
}

interface Type {
  type: string;
  setToggleChat?: (value: boolean) => void;
  colonies: Array<any>;
}

const FriendRequests = ({ type, setToggleChat, colonies }: Type) => {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          {type === "friends" && "Friend"} Colonies
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {colonies?.map((colony: Colony) => (
            <div key={colony?._id}>
              <FriendReq
                colony={colony}
                type={type}
                setToggleChat={setToggleChat}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendRequests;
