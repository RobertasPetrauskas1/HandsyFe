import { Container } from "react-bootstrap";
import Comment from "./Comment";


export default function CommentList(props) {
    if (props.comments.length === 0) {
        return (
            <div className="mb-3 p-3 item-card">
                There are currently no comments.
            </div>
        )
    } else {
        return props.comments.map((comment) => {
            return (
                <Container key={comment.id}>
                    <Comment comment={comment} user_id={props.user_id} group_id={props.group_id} item_id={props.item_id} />
                </Container>
            );
        })
    }
}