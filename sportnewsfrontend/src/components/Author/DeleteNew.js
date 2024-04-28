import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { deleteNewAu } from "../../services/author";
import { deleteUserAd } from "../../services/admin";
import { useSelector } from 'react-redux';

const DeleteNew = (props) => {
  const { handleClose, isShowDelete, dataDelete, displayListNew, displayListUser } = props;
  const user = useSelector(state => state.user.userData)
  const handleDelete = async () => {
    if (dataDelete.type === true) {
      let res = await deleteNewAu(dataDelete);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      handleClose();
      displayListNew();
    } else {
      let res = await deleteUserAd(dataDelete);
      if (res && res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
      handleClose();
      displayListUser(user && user.userID);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={isShowDelete} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure to delete?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteNew;
