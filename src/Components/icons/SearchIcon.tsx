// icon:search-circle-sharp | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from "react";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="2.5em"
      width="2.5em"
      {...props}
    >
      <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm80 294.63l-54.15-54.15a88.08 88.08 0 1122.63-22.63L358.63 336z" />
      <path d="M288 232 A56 56 0 0 1 232 288 A56 56 0 0 1 176 232 A56 56 0 0 1 288 232 z" />
    </svg>
  );
}

export default SearchIcon;
