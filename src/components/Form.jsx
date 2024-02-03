import React, { useRef } from "react";

import { useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

function Form({ setCompleted }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);
  const signRef = useRef(null);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [signError, setSignError] = useState("");
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  const verify = (force = false) => {
    if (!hasSubmittedOnce && !force) return;
    let flag = true;
    if (name.trim().length === 0) {
      setNameError("required");
      flag = false;
    } else if (name.trim().length < 2) {
      setNameError("Please enter at least two characters");
      flag = false;
    } else if (name.trim().length > 50) {
      setNameError("Please enter an abbreviated name");
      flag = false;
    } else {
      setNameError("");
    }

    if (email.trim().length === 0) {
      setEmailError("required");
      flag = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Invalid email");
      flag = false;
    } else {
      setEmailError("");
    }

    if (signed === false) {
      setSignError("required");
      flag = false;
    } else {
      setSignError("");
    }

    return flag;
  };

  const submit = () => {
    if (!hasSubmittedOnce) setHasSubmittedOnce(true);
    if (verify(true)) {
      setCompleted(true);
    }
  };

  useEffect(() => {
    if (hasSubmittedOnce) verify();
  }, [hasSubmittedOnce, name, email, signed]);
  return (
    <div className="bg">
      <div className="form-container font-sans">
        <label className="input-label" id="name-label">
          Name
        </label>
        {nameError && <label className="input-error-label">{nameError}</label>}
        <input
          aria-labelledby="name-label"
          className={`input ${nameError ? "input-error" : ""}`}
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="name"
        />
        <label className="input-label" id="email-label">
          Email
        </label>
        {emailError && (
          <label className="input-error-label">{emailError}</label>
        )}
        <input
          aria-labelledby="email-label"
          className={`input ${nameError ? "input-error" : ""}`}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <label className="input-label" id="legal-label">
          Waiver Agreement
        </label>
        <p className="text-sm text-justify mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et
          lorem sed mauris feugiat iaculis porta semper lectus. Cras faucibus
          libero et ligula placerat, vestibulum luctus dui maximus. Fusce
          tincidunt consectetur sapien, sed finibus tortor ultricies id. Nullam
          mattis, nisi quis ornare mollis, nulla justo iaculis neque, sit amet
          malesuada erat justo lobortis eros. Ut magna lacus, cursus sed quam
          in, malesuada sodales sem. Vestibulum quis feugiat risus. Suspendisse
          metus nisl, varius facilisis efficitur quis, interdum id felis.
          Quisque non odio neque. Pellentesque tempus id augue in venenatis.
          Suspendisse vel lectus et eros consectetur elementum. Donec viverra
          bibendum orci, eu interdum quam finibus eget. Donec tempor nisl sed
          justo mattis rutrum. Donec ultrices mauris vel velit ultrices placerat
          nec eu massa. Morbi ac mauris at ex ullamcorper dictum. Pellentesque
          et eros id dui pharetra posuere. Etiam lobortis finibus dui, ac
          placerat dui imperdiet quis. Sed ultrices neque sagittis pulvinar
          molestie. Aliquam elit nibh, ultricies eu porta nec, varius eget
          massa. Praesent eu laoreet elit. Aliquam et luctus lectus, vitae
          rhoncus sem. Suspendisse accumsan hendrerit condimentum. Etiam et
          congue risus. Donec sit amet consectetur neque. Curabitur a enim in
          mauris tincidunt hendrerit. Nullam sed semper diam. Vivamus porttitor
          sapien et purus tempor pellentesque. Fusce quis porttitor est.
        </p>
        <label className="input-label flex justify-between" id="legal-label">
          Signature
          {signed && (
            <button
              onClick={() => {
                signRef.current.clear();
                setSigned(false);
              }}
              className="flex items-center hover:underline"
            >
              Clear <img className="ml-1 w-4" src="/cross.svg" />
            </button>
          )}
        </label>
        {signError && <label className="input-error-label">{signError}</label>}
        <div className="border border-[#212529] mt-1">
          <SignatureCanvas
            ref={(ref) => (signRef.current = ref)}
            penColor="mediumblue"
            canvasProps={{ width: 600, height: 200, className: "sigCanvas" }}
            onEnd={() => setSigned(true)}
          />
        </div>
        <button className="button" style={{ marginTop: 16 }} onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
