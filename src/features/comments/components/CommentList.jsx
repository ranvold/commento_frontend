import CommentCard from "./CommentCard"
import { useRouteLoaderData } from "react-router"

function CommentList({ comments }) {
  const { currentUser } = useRouteLoaderData("authenticated")

  return (
    <div>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}

export default CommentList
