import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { registerNewUser } from "../../../services/account";

const Register = (props) => {
  const { show, handleClose } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPass: true,
    isValidConfirmPass: true,
    isValidFullname: true,
  };

  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  useEffect(() => {
  }, []);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.warning("email is required");
      return false;
    }

    let regxemail = /\S+@\S+\.\S+/;
    if (!regxemail.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a valid email");
      return false;
    }

    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPass: false });
      toast.warning("password is required");
      return false;
    }

    let regxpass = /^(?=.*[\d])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,16}$/;
    if (!regxpass.test(password)) {
      setObjCheckInput({ ...defaultValidInput, isValidPass: false });
      toast.warning("password is not valid");
      return false;
    }

    if (password != confirmPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfirmPass: false });
      toast.warning("confirm password is not the same!");
      return false;
    }

    if (!fullname) {
      setObjCheckInput({ ...defaultValidInput, isValidFullname: false });
      toast.warning("fullname is required");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();

    if (check === true) {
      let response = await registerNewUser(email, password, fullname);
      if (+response.EC === 0) {
        toast.success(response.EM);
        handleClose();
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullname("");
      } else {
        toast.error(response.EM);
      }
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="register-container">
            <div className="container">
              <div className="row">
                <div className="content col-12">
                  <div className="loginForm d-flex flex-column gap-3 py-3 ">
                    <div className="form-group">
                      <label>Email Address :</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className={
                          objCheckInput.isValidEmail
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Password :</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={
                          objCheckInput.isValidPass
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm Password :</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className={
                          objCheckInput.isValidConfirmPass
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Full name :</label>
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        className={
                          objCheckInput.isValidFullname
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        placeholder="Full name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => handleRegister()}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
