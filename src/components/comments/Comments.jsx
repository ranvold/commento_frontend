import Comment from "./Comment"
import { useRouteLoaderData } from "react-router"

function Comments({ comments }) {
  const { currentUser } = useRouteLoaderData("authenticated")

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} currentUser={currentUser} />
      ))}
    </div>
  )
}

export default Comments
