import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { statusNew, statusAuthor } from "../../services/admin";
import { useDispatch, useSelector } from 'react-redux';

const AreYouSure = (props) => {
  const {
    handleClose,
    isShowSure,
    dataSure,
    displayListNew,
    displayListAuthor,
  } = props;
  const user = useSelector(state => state.user.userData)
  const handleSubmit = async () => {
    if (dataSure.type === true) {
      let res = await statusAuthor(dataSure);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      handleClose();
      displayListAuthor(user && user.userID);
    } else {
      let res = await statusNew(dataSure);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      handleClose();
      displayListNew(user && user.userID);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={isShowSure} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
          <Button variant="danger" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AreYouSure;
