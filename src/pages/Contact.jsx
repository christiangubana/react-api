import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  h4 {
    color: #fab005;
    text-transform: uppercase;
    padding: 10px;
  }
`;

function ContactForm() {
  // State for form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // State for form validation
  const [validationErrors, setValidationErrors] = useState({});

  // Handle form input
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form input
    let errors = {};
    if (!formData.name.match(/^[a-zA-Z ]*$/)) {
      errors.name = "Name can only contain letters";
    }
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = "Invalid email address";
    }
    if (!formData.phone.match(/^\+?27\d{9}$/)) {
      errors.phone = "Invalid South African phone number";
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Send data to API
    try {
      const response = await fetch(
        "http://dev3.elemental.co.za/elemental-cms/front_end/contact_form_test",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        // Show success message
        alert("Success!");
        setFormData({
          name: "",
          email: "",
          phone: "",
        })
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Wrapper>
        <h4>Contact Page</h4>
      </Wrapper>
      <form id="contact" onSubmit={handleSubmit}>
        <h3>Elemental Contact Form</h3>
        <h4>Contact us for custom quote</h4>
        <label>
          Name:
          <fieldset>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {validationErrors.name && (
              <p className="validation-error">{validationErrors.name}</p>
            )}
          </fieldset>
        </label>

        <label>
          Email:
          <fieldset>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {validationErrors.email && (
              <p className="validation-error">{validationErrors.email}</p>
            )}
          </fieldset>
        </label>
        <label>
          <fieldset>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
            {validationErrors.phone && (
              <p className="validation-error">{validationErrors.phone}</p>
            )}
          </fieldset>
        </label>
        <fieldset>
          <button
            name="submit"
            type="submit"
            id="contact-submit"
            data-submit="...Sending"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default ContactForm;
