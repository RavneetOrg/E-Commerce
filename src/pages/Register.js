import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import TextError from "../components/TextError";

const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .required("Required")
    .min(2, "Too Short")
    .max(20, "Too Large"),
  Password: Yup.string()
    .required("Required")
    .min(8, "Too Short")
    .max(20, "Too Large"),
  Address: Yup.array().of(Yup.string().required("Required")),
  PhNumbers: Yup.array()
    .of(Yup.string().required("Required")),
  Social: Yup.object({
    facebook: Yup.string().required("Required"),
    twitter: Yup.string().required("Required"),
  }),
  Occupation: Yup.string().required("Required"),
  Sex: Yup.string().required("Required"),
  DOB: Yup.date().required("Required"),
  Checkbox: Yup.array().required("Required"),
});
const initialValues = {
  Name: "",
  Email: "",
  Password: "",
  Sex: "",
  DOB: null,
  PhNumbers: [""],
  Address: ["", "", "", ""],
  Social: {
    facebook: "",
    twitter: "",
  },
  Occupation: "",
  Checkbox: [],
};
const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};
function validateEmail(value) {
  let error;

  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}
const dropDownOptions = [
  { key: "Select an option...", value: "" },
  { key: "Student", value: "Student" },
  { key: "Employee", value: "Employee" },
  { key: "Unemployeed", value: "Unemployeed" },
];
const radioOptions = [
  { key: "Male", value: "Male" },
  { key: "Female", value: "Female" },
];
const checkOptions = [
  { key: "Men", value: "Mens" },
  { key: "Women", value: "Women" },
  { key: "Kids", value: "Kids" },
  { key: "Electronics", value: "Electronics" },
];
function Register() {
  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="text-center">Register</h1>
        <hr />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <div className="form my-3">
                  <label htmlFor="Name">Full Name</label>
                  <Field name="Name" id="Name" type="text" />
                  <ErrorMessage name="Name" component={TextError} />
                </div>
                <div className="form my-3">
                  <label htmlFor="Email">Email address</label>
                  <Field
                    name="Email"
                    id="Email"
                    type="email"
                    validate={validateEmail}
                  />
                  <ErrorMessage name="Email" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="Password">Password</label>
                  <Field name="Password" id="Password" type="password" />
                  <ErrorMessage name="Password">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="form my-3 sex">
                  <label htmlFor="Sex">Sex</label>
                  <Field name="Sex">
                    {({ field }) => {
                      return radioOptions.map((option) => {
                        return (
                          <React.Fragment key={option.key}>
                            <input
                              type="radio"
                              id={option.value}
                              {...field}
                              value={option.value}
                              checked={field.value === option.value}
                            />
                            <label htmlFor={option.value}>{option.key}</label>
                          </React.Fragment>
                        );
                      });
                    }}
                  </Field>
                  <ErrorMessage name="Sex" component={TextError} />
                </div>
                <div className="form my-3">
                  <label htmlFor="DOB">Date of Birth</label>
                  <Field name="DOB" type="date">
                    {({ field, form }) => {
                      const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <DateView
                          id="DOB"
                          {...field}
                          selected={value}
                          onChange={(val) => setFieldValue(field.name, val)}
                        />
                      );
                    }}
                  </Field>
                  <ErrorMessage name="DOB" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="">List of Phone Numbers</label>
                  <FieldArray name="PhNumbers" id="PhNumbers" type="text">
                    {(fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { PhNumbers } = values;
                      console.log(<FieldArray />);
                      return (
                        <div>
                          {PhNumbers.map((PhNumbers, index) => (
                            <>
                              {index < 3 ? (
                                <div key={index}>
                                  <Field name={`PhNumbers[${index}]`} />
                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      -
                                    </button>
                                  )}
                                    <button
                                      type="button"
                                      onClick={() => push("")}
                                    >
                                      +
                                    </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </>
                          ))}
                        </div>
                      );
                    }}
                  </FieldArray>
                  <ErrorMessage name="PhNumbers" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="houseNo">House No.</label>
                  <Field name="Address[0]" id="houseNo" type="text" />
                  <ErrorMessage name="Address[0]" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="street">Street</label>
                  <Field name="Address[1]" id="street" type="text" />
                  <ErrorMessage name="Address[1]" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="city">City</label>
                  <Field name="Address[2]" id="city" type="text" />
                  <ErrorMessage name="Address[2]" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="pincode">PinCode</label>
                  <Field name="Address[3]" id="pincode" type="text" />
                  <ErrorMessage name="Address[3]" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="facebook">Facebook Profile</label>
                  <Field name="Social.facebook" id="facebook" type="text" />
                  <ErrorMessage name="Social.facebook" component={TextError} />
                </div>
                <div className="form  my-3">
                  <label htmlFor="twitter">Twitter Profile</label>
                  <Field name="Social.twitter" id="twitter" type="text" />
                  <ErrorMessage name="Social.twitter" component={TextError} />
                </div>
                <div className="form my-3">
                  <label htmlFor="Occupation">Occupation</label>
                  <Field name="Occupation" id="Occupation" as="select">
                    {dropDownOptions.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.key}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="Occupation" component={TextError} />
                </div>
                <div className="form my-3 sex">
                  <label htmlFor="Checkbox">Preferences</label>
                  <Field name="Checkbox">
                    {({ field }) => {
                      return checkOptions.map((option) => {
                        return (
                          <React.Fragment key={option.key}>
                            <input
                              type="checkbox"
                              id={option.value}
                              {...field}
                              value={option.value}
                              checked={field.value.includes(option.value)}
                            />
                            <label htmlFor={option.value}>{option.key}</label>
                          </React.Fragment>
                        );
                      });
                    }}
                  </Field>
                  <ErrorMessage name="Checkbox" component={TextError} />
                </div>
                <div className="text-center">
                  <button
                    className="my-2 mx-auto btn btn-dark"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Register
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="my-3">
          <p>
            Already has an account?{" "}
            <Link to="/login" className="text-decoration-underline text-info">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
