import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CommentIcnProps {
  size: { width: number; height: number };
  post: { _id: string }; // Adjust type as per your post structure
  setShow:(value:boolean)=>void
}

const CommentIcn: React.FC<CommentIcnProps> = ({ size, post,setShow }) => {
  const navigate = useNavigate();

  return (
    <>
      <svg
        onClick={() =>setShow(true) }
        className="mt-1 cursor-pointer ml-2 border-black"
        width={size?.width}
        height={size?.height}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#fafafa"
          strokeWidth="1.536"
        >
          {" "}
          <title>comment 2</title>{" "}
          <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            {" "}
            <g
              id="Icon-Set-Filled"
              transform="translate(-154.000000, -257.000000)"
              fill="#000000"
            >
              {" "}
              <path
                d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z"
                id="comment-2"
              >
                {" "}
              </path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <title>comment 2</title>{" "}
          <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
          <g
            id="Page-1"
            stroke="#030202"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            {" "}
            <g
              id="Icon-Set-Filled"
              transform="translate(-154.000000, -257.000000)"
              fill="#d4d4d8"
            >
              {" "}
              <path
                d="M177,270 L163,270 C162.448,270 162,269.553 162,269 C162,268.448 162.448,268 163,268 L177,268 C177.552,268 178,268.448 178,269 C178,269.553 177.552,270 177,270 L177,270 Z M175,276 L165,276 C164.448,276 164,275.553 164,275 C164,274.447 164.448,274 165,274 L175,274 C175.552,274 176,274.447 176,275 C176,275.553 175.552,276 175,276 L175,276 Z M170,257 C161.164,257 154,263.269 154,271 C154,275.419 156.345,279.354 160,281.919 L160,289 L167.009,284.747 C167.979,284.907 168.977,285 170,285 C178.836,285 186,278.732 186,271 C186,263.269 178.836,257 170,257 L170,257 Z"
                id="comment-2"
              >
                {" "}
              </path>{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    </>
  );
};

export default CommentIcn;
