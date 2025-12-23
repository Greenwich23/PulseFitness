import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import "./UpdateprofilePopUp.css";
import { FaX } from "react-icons/fa6";
import StyledButton from "./Buttons";
import { useState } from "react";
import { useAuth } from "../Context/authContext";
import toast from "react-hot-toast";

export default function EditProfileModal({ open, onClose }) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setNewPhoneNumber] = useState(user?.phoneNumber || "");
  const [error, setError] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !phoneNumber) {
      setError("All fields are required");
      return;
    }

    try {
      updateProfile({ name, phoneNumber });
      toast.success("Profile updated successfully ✅");
      onClose()
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={() => {}} className="modal-root">
      {/* backdrop */}
      <div className="modal-backdrop" />

      {/* wrapper */}
      <div className="modal-wrapper">
        <DialogPanel className="modal-panel">
          <DialogTitle className="modal-title">
            <p>Edit Profile</p>
            <FaX onClick={onClose} />
          </DialogTitle>

          {/* form content */}
          <form action="" onSubmit={handleUpdateProfile}>
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              required
            />
            <p style={{color: "red", marginTop : "10px"}}>{error}</p>
            <div className="editProfilePopupBtn">
              <StyledButton type="submit">Edit Profile Info</StyledButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
