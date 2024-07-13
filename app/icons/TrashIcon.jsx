import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TrashIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.75 4.485a76.276 76.276 0 00-7.515-.375c-1.485 0-2.97.075-4.455.225l-1.53.15M6.375 3.728l.165-.983c.12-.712.21-1.245 1.478-1.245h1.964c1.268 0 1.366.563 1.478 1.252l.165.976M14.137 6.855l-.487 7.553c-.083 1.178-.15 2.092-2.243 2.092H6.592c-2.092 0-2.16-.915-2.242-2.092l-.488-7.553M7.747 12.375h2.498M7.125 9.375h3.75"
        stroke="#2A2A2A"
        strokeOpacity={0.5}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default TrashIcon;