import React from "react"

import ContentLoader from "react-content-loader"

const Loader = (props: any) => (
  <ContentLoader
    speed={2}
    width={1250}
    height={400}
    viewBox="0 0 1250 400"
    backgroundColor="#7a7a7a"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="300" y="46" rx="0" ry="0" width="1250" height="400"/>
  </ContentLoader>
)

export default Loader
