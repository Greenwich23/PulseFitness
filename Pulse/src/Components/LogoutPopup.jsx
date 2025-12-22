import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import "./updateprofilePopUp.css";
import { FaX } from "react-icons/fa6";
import StyledButton from "./Buttons";
import { useState } from "react";
import { useAuth } from "../Context/authContext";
import toast from "react-hot-toast";
import "./updateProfilePopup.css";
import { useNavigate } from "react-router-dom";

export default function LogOutModal({ open, onClose }) {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      // clear auth state
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  //   const handleLogoutBtn = (e) => {
  //     e.preventDefault();
  //     setError("");

  //     if (!name || !phoneNumber) {
  //       setError("All fields are required");
  //       return;
  //     }

  //     try {
  //       updateProfile({ name, phoneNumber });
  //       toast.success("Profile updated successfully ✅");
  //       onClose()
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  return (
    <Dialog open={open} onClose={() => {}} className="modal-root">
      {/* backdrop */}
      <div className="modal-backdrop" />

      {/* wrapper */}
      <div className="modal-wrapper">
        <DialogPanel className="modal-panel">
          <DialogTitle className="logOutTitle">
            <p>Are you sure you want to Log out?</p>
          </DialogTitle>
          <div className="logOutBtnsDiv">
            <button className="logOutBtns" onClick={() => handleLogout()}>
              Yes
            </button>
            <button className="logOutBtns" onClick={onClose}>
              No
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
