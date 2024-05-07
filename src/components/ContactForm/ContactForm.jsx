import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";

const FeedbackSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^(?:\d{10}|\d{3}-\d{3}-\d{2}-\d{2})$/,
      "Phone number must be 10 digits long or in format xxx-xxx-xx-xx"
    )
    .required("Required"),
});

const ContactForm = ({ onAddContact }) => {
  const nameFieldId = useId();
  const phoneFieldId = useId();

  return (
    <Formik
      initialValues={{ username: "", number: "" }}
      validationSchema={FeedbackSchema}
      onSubmit={(values, actions) => {
        const newContact = {
          id: nanoid(),
          name: values.username,
          number: values.number,
        };
        onAddContact(newContact);
        actions.resetForm();
      }}
    >
      <Form>
        <label htmlFor={nameFieldId}>Username</label>
        <Field type="text" name="username" id={nameFieldId} />

        <label htmlFor={phoneFieldId}>Phone</label>
        <Field type="text" name="number" id={phoneFieldId} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;