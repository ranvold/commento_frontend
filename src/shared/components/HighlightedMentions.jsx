import { Fragment } from "react"

import {
  getMentionClassName,
  getMentionSegments,
} from "@/shared/utils/mentionHighlights"

function HighlightedMentions({ text, currentUsername }) {
  return getMentionSegments(text).map((segment) => {
    if (segment.type === "mention") {
      return (
        <span
          key={segment.key}
          className={getMentionClassName(segment.value, currentUsername)}
        >
          {segment.value}
        </span>
      )
    }

    return <Fragment key={segment.key}>{segment.value}</Fragment>
  })
}

export default HighlightedMentions
