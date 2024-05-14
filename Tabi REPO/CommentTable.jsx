import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import "components/comments/comment.css";
const _logger = debug.extend("Test");

function CommentTable(props) {
  const onEditCommentClick = () => {
    _logger("this is my comment props", props);
    let payload = {
      id: props.comment.id,
      subject: props.comment.subject,
      text: props.comment.text,
    };
    props.handleModalDisplay(payload);
  };

  const onReplyToCommentClick = () => {
    _logger("this is my comment props", props);

    props.replyCommentHandler(props.comment);
  };

  // const renderReply = (reply) => {
  //   return (
  //     <tr key={reply.id}>

  //     </tr>
  //   );
  // };

  return (
    <tr>
      <td>{props.comment.subject}</td>
      <td>{props.comment.text}</td>
      <td>{props.comment.firstName}</td>
      <td>{props.comment.lastName}</td>
      <td>
        <button
          type="submit"
          className="comment-form-button btn"
          onClick={onReplyToCommentClick}
        >
          Reply
        </button>
      </td>
      <td>
        <button
          type="submit"
          className="comment-form-button btn"
          onClick={onEditCommentClick}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

CommentTable.propTypes = {
  setSingleComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    subject: PropTypes.string,
    text: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  singleComment: PropTypes.shape({
    id: PropTypes.number,
    subject: PropTypes.string,
    text: PropTypes.string,
  }),

  handleModalDisplay: PropTypes.func,
  replyCommentHandler: PropTypes.func,
};
export default CommentTable;
