import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as commentFormService from "components/comments/commentService";
import toastr from "toastr";
import debug from "sabio-debug";
import commentSchema from "./commentSchema";
import PropTypes from "prop-types";
import "components/comments/comment.css";
const _logger = debug.extend("CommmentForm");

function CommentForm(props) {
  const [commentFormLayout, setCommentFormLayout] = useState({
    subject: "",
    text: "",
    EntityId: props.data.entityId,
    EntityType: props.data.entityType,
    ParentId: 0,
    isDeleted: false,
  });

  useEffect(() => {
    if (props.comment.id) {
      setCommentFormLayout((prevState) => {
        const newState = { ...prevState };

        newState.subject = props.comment.subject;
        newState.text = props.comment.text;

        return newState;
      });
    } else {
      setCommentFormLayout((prevState) => {
        const newState = { ...prevState };

        newState.subject = props.comment.subject;
        newState.text = props.comment.text;
        newState.ParentId = props.parentId;

        return newState;
      });
    }
  }, []);

  const handleSubmit = (values) => {
    if (values.ParentId !== 0) {
      _logger("Adding a reply");
      commentFormService
        .addComment(values)
        .then(onAddSuccesComment)
        .catch(onAddErrorComment);
    }
    if (props.comment.id !== null) {
      let payload = { ...values, id: props.comment.id };
      commentFormService
        .updateComment(payload, props.comment.id)
        .then(onSuccesComment)
        .catch(onErrorComment);
    } else {
      commentFormService
        .addComment(values)
        .then(onAddSuccesComment)
        .catch(onAddErrorComment);
    }
  };
  const onSuccesComment = (response) => {
    toastr.success("Comment update submission was successful`");
    _logger(response);

    props.setter();
  };

  const onErrorComment = (err) => {
    _logger(err);
    toastr.error("Error submission during Comment edit");
  };
  const onAddSuccesComment = (response) => {
    _logger(response);
    toastr.error("Success submission during Comment Post");
  };
  const onAddErrorComment = (err) => {
    _logger(err);
    toastr.error("Error submission during Comment Post");
  };
  return (
    <div
      className={props.from === "modal" ? "modal-body-style" : "comment-card"}
    >
      <Formik
        enableReinitialize={true}
        initialValues={commentFormLayout}
        onSubmit={handleSubmit}
        validationSchema={commentSchema}
      >
        <Form className="comment-color">
          <div className="comment-form-text">
            Subject:
            <div className="form mb-2">
              <Field
                size="sm"
                type="text"
                name="subject"
                className="form-control comment-form-placeholder"
                id="comment"
                placeholder="Subject:"
              ></Field>
              <label
                htmlFor="floatingInputGroup1"
                className="form-label"
              ></label>
              <ErrorMessage
                name="subject"
                component="div"
                className="subject-form-error has-error"
              />
            </div>
          </div>
          <div className="comment-form-text">
            Text:
            <div className="form mb-2">
              <Field
                size="sm"
                type="text"
                name="text"
                className="form-control comment-form-placeholder"
                id="text"
                placeholder="Text:"
              ></Field>
              <label
                htmlFor="floatingInputGroup1"
                className="comment-form-group-label"
              ></label>
              <ErrorMessage
                name="text"
                component="div"
                className="subject-form-error comment-has-error"
              />
            </div>
          </div>
          <button
            type="submit"
            className="comment-form-button btn btn-secondary btn-sm"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
CommentForm.propTypes = {
  data: PropTypes.shape({
    entityId: PropTypes.number.isRequired,
    entityType: PropTypes.number.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    subject: PropTypes.string,
    text: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  from: PropTypes.string,
  setter: PropTypes.func,

  parentId: PropTypes.number,
};

export default CommentForm;
