//Form comments schema
import * as Yup from "yup";

const commentSchema = Yup.object().shape({
  subject: Yup.string()
    .max(50, "You have reached the mximum character length")
    .required("Subject is required"),
  text: Yup.string()
    .max(3000, "You have reached the mximum character length")
    .required("Text is required"),
});

export default commentSchema;
