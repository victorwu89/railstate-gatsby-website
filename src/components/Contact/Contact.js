/* eslint no-unused-vars: 0 */

import { navigate } from "gatsby";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import PropTypes from "prop-types";
import React from "react";

const FormItem = Form.Item;
const { TextArea } = Input;
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import { ThemeContext } from "../../layouts";

const Contact = props => {
  const { getFieldDecorator } = props.form;

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        document.getElementById("contactForm").submit();
      }
    });
  }

  function sendMessage(values) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...values })
    })
      .then(() => {
        console.log("Form submission success");
        navigate("/success");
      })
      .catch(error => {
        console.error("Form submission error:", error);
        this.handleNetworkError();
      });
  }

  function handleNetworkError(e) {
    console.log("submit Error");
  }

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <h3 id="message">Drop us a message and we will get back to you ASAP!</h3> <br />
            <div id="contact-left" className="form">
              <Form
                id="contactForm"
                name="contact"
                action="https://getform.io/f/39fcad55-2530-4f74-976c-7bdb398a1a79"
                onSubmit={handleSubmit}
                method="POST"
              >
                <FormItem label="Name">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your full name!",
                        whitespace: true
                      }
                    ]
                  })(<Input name="name" />)}
                </FormItem>
                <FormItem label="E-mail">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your e-mail address!",
                        whitespace: true,
                        type: "email"
                      }
                    ]
                  })(<Input name="email" />)}
                </FormItem>
                <FormItem label="Message">
                  {getFieldDecorator("message", {
                    rules: [
                      { required: true, message: "Please input your message!", whitespace: true }
                    ]
                  })(
                    <TextArea
                      name="message"
                      placeholder=""
                      width="425"
                      autosize={{ minRows: 4, maxRows: 10 }}
                    />
                  )}
                </FormItem>
                <div
                  className="g-recaptcha"
                  data-sitekey="6LeiuN0UAAAAABT43ve4iwmMuiGqcKRBbjaNy7j-"
                />
                <FormItem>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </FormItem>
                <p>
                  <em>
                    This site is protected by reCAPTCHA and the Google
                  <a href="https://policies.google.com/privacy"> Privacy Policy</a> and
                    <a href="https://policies.google.com/terms"> Terms of Service</a> apply.
                  </em>
                </p>
              </Form>
            </div>
            <div id="contact-right">
              <h3>OUR OFFICE</h3>
              <p>
                10 Tyler St, Somerville, <br />
                Massachusetts, <br />
                02143
              </p>
              <h3>CONTACT</h3>
              <p>
                <a href="mailto:contact@business.com?subject=You've%20got%20mail!"><u>contact@railstate.com</u></a>
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2947.1783329492564!2d-71.10740294935785!3d42.38134734164809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e377365ebc8417%3A0xf49a14ffb90612e7!2s10%20Tyler%20St%2C%20Somerville%2C%20MA%2002143%2C%20USA!5e0!3m2!1sen!2sfr!4v1583938560419!5m2!1sen!2sfr"
                width="550"
                height="425"
                frameBorder="0"
                frameBorderreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
            {/* --- STYLES --- */}
            <style jsx>{`
              .form {
                background: transparent;
                max-width: 55%;

                p {
                  max-width: 100%;
                  padding: 0px;
                  margin: 0px;
                }
              }

              .form :global(.ant-row.ant-form-item) {
                margin: 0 0 1em;
              }
              .form :global(.ant-row.ant-form-item:last-child) {
                margin-top: 1em;
              }
              .form :global(.ant-form-item-control) {
                line-height: 1em;
              }
              .form :global(.ant-form-item-label) {
                line-height: 1em;
                margin-bottom: 0.5em;
              }
              .form :global(.ant-form-item) {
                margin: 0;
              }
              .form :global(.ant-input) {
                appearance: none;
                height: auto;
                font-size: 1.2em;
                padding: 0.5em 0.6em;
                width: 100%;
              }
              .form :global(.ant-btn-primary) {
                height: auto;
                font-size: 1.2em;
                padding: 0.5em 3em;
                background: ${theme.color.brand.primary};
                border: 1px solid ${theme.color.brand.primary};
                max-width: 100%;
                width: 100%;
              }
              .form :global(.ant-form-explain) {
                margin-top: 0.2em;
              }

              @from-width desktop {
                .form :global(input) {
                  max-width: 100%;
                }

                #contact-right,
                #contact-left {
                  display: inline-block;
                }

                #contact-right {
                  vertical-align: top;
                  width: 40%;
                  padding: 25px;
                  margin-top: -12%;
                }
              }
            `}</style>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

Contact.propTypes = {
  form: PropTypes.object
};

const ContactForm = Form.create({})(Contact);

export default ContactForm;
