import CommentCard from "./CommentCard"

import { useAuth } from "@/features/auth/hooks/useAuth"

function CommentList({ comments }) {
  const { user } = useAuth()

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} user={user} />
      ))}
    </div>
  )
}

export default CommentList
