import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import debug from "sabio-debug";
import * as commentFormService from "components/comments/commentService";
import toastr from "toastr";
import CommentTable from "./CommentTable";
import "components/comments/comment.css";
import { Modal } from "react-bootstrap";
import { Fade } from "react-bootstrap";

const _logger = debug.extend("Commment");

function Comment() {
  const [comments, setComments] = useState({
    commentsList: [],
    commentsComponent: [],
  });

  const [modalShow, setModalShow] = useState(false);

  const [data] = useState({
    entityId: 3,
    entityType: 2,
  });

  const [singleComment, setSingleComment] = useState({
    id: null,
    subject: "",
    text: "",
  });

  const [parentId, setParentId] = useState(0);

  const handleClose = () => {
    setModalShow(false);
  };

  const handleModalDisplay = (commentObj) => {
    setSingleComment(commentObj);
    setModalShow(true);
  };

  useEffect(() => {
    commentFormService
      .getComment(3, 2)
      .then(onSuccesComment)
      .catch(onErrorComment);
  }, []);

  const onSuccesComment = (response) => {
    toastr.success("Comment submission was successful`");
    let commentArray = response.item;
    _logger("These are my items", response.item);
    setComments((prevState) => {
      const newComment = { ...prevState };
      newComment.commentsList = commentArray;
      newComment.commentsComponent = commentArray.map(mapComments);
      return newComment;
    });

    _logger(response);
  };

  const onErrorComment = (err) => {
    _logger(err);
    toastr.error("Error occurred during Comment submission");
  };

  const replyCommentHandler = (parentCommentObj) => {
    setParentId(parentCommentObj.id);
    setModalShow(true);
  };

  const mapComments = (aComment) => {
    return (
      <CommentTable
        key={aComment.id}
        comment={aComment}
        setSingleComment={setSingleComment}
        handleModalDisplay={handleModalDisplay}
        replyCommentHandler={replyCommentHandler}
      ></CommentTable>
    );
  };

  const setter = () => {
    setSingleComment((prevState) => {
      const newState = { ...prevState };

      newState.id = null;

      return newState;
    });
  };
  return (
    <React.Fragment>
      <Modal show={modalShow} onHide={handleClose} animation={Fade}>
        <Modal.Header
          closeButton
          className="comment-modal-table"
        ></Modal.Header>
        <Modal.Body className="comment-modal-table">
          <CommentForm
            data={data}
            comment={singleComment}
            parentId={parentId}
            onSuccess={handleClose}
            setter={setter}
            from={"modal"}
          />
        </Modal.Body>
      </Modal>
      <div>
        <CommentForm
          data={data}
          comment={singleComment}
          repliedComment={parentId}
        />
        <div className="comment-main-container">
          <section className="comment-table-header">
            <h1> Comment Information </h1>
          </section>
          <div className="comment-table-container">
            <table className="table comment-table-hover mt-3 shadow-lg">
              <thead>
                <tr className="bg-headers comment-table-hover">
                  <th scope="col">Subject</th>
                  <th scope="col">Text</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                </tr>
              </thead>
              <tbody className="comment-table-body">
                {comments.commentsComponent}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Comment;
