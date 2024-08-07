import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

function IconTickCircle(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="2em" width="2em" {...props}>
      <path
        fill="skyblue" // Change the fill color to sky blue
        fillRule="evenodd"
        d="M0 7.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0zm7.072 3.21l4.318-5.398-.78-.624-3.682 4.601L4.32 7.116l-.64.768 3.392 2.827z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default IconTickCircle;
