import { useAuth } from "../Context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./profile.css";
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  FaArrowDown,
  FaArrowRight,
  FaBox,
  FaBoxOpen,
  FaGear,
} from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { SlLogout } from "react-icons/sl";
import { useState, useEffect } from "react";
import StyledButton from "../Components/Buttons";
import toast from "react-hot-toast";
import { useCartContext } from "../Context/cartContext";
import EditProfileModal from "../Components/UpdateProfilePopup";

export default function Profile() {
  const [sideBarPage, setSideBarPage] = useState("Profile Overview");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [eyeCurrentPasswordOpen, setEyeCurrentPasswordOpen] = useState(false);

  const [eyeNewPasswordOpen, setEyeNewPasswordOpen] = useState(false);
  const [eyeConfirmPasswordOpen, setEyeConfirmPasswordOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  // const [isLogOutOpen, setIsLogOutOpen] = useState(false);

  const [error, setError] = useState("");

  const { logout, updatePassword } = useAuth();
  const { user } = useAuth() || {};

  const [usersNoOrders, setUserNoOrders] = useState(
    !user?.orders ? 0 : user?.orders.length
  );

  console.log(user?.orders);
  const { cart } = useCartContext();
  console.log(user);

  const handleLogout = async () => {
    try {
      await logout(); // clear auth state
      navigate("/", { replace: true }); // redirect to HOME
    } catch (err) {
      console.error(err);
    }
  };

  // In Profile.jsx, add this useEffect
  useEffect(() => {
    console.log("Current user orders:", user?.orders);
    console.log(
      "All users from localStorage:",
      JSON.parse(localStorage.getItem("users") || "[]")
    );
  }, [user]);

  const getInitials = (name) => {
    if (typeof name !== "string") return "";

    return name
      .trim()
      .split(" ")
      .filter(Boolean) // 🔑 removes empty strings
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  const handleChangePassword = () => {
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      updatePassword(currentPassword, newPassword);

      toast.success("Password updated successfully 🔐");

      // Clear inputs
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Change the click handler to toggle specific order
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  console.log(user?.orders?.length);
  console.log(user?.orders);


  return (
    <div className={"profilePage"}>
      <h2 className="profilePageHeader">My Account</h2>
      <hr />
      <div className={"profileSection"}>
        <div className={"profileSideBarDiv"}>
          <div
            className={
              sideBarPage == "Profile Overview"
                ? "profileDetailsDiv active"
                : "profileDetailsDiv"
            }
            onClick={() => setSideBarPage("Profile Overview")}
          >
            <FaEdit className="profileDetailsIcon" />
            <p>Profile Overview</p>
          </div>
          <div
            className={
              sideBarPage == "My Orders"
                ? "profileDetailsDiv active"
                : "profileDetailsDiv"
            }
            onClick={() => setSideBarPage("My Orders")}
          >
            <FaBox className="profileDetailsIcon" />
            <p>My Orders</p>
          </div>
          <div
            className={
              sideBarPage == "Account Settings"
                ? "profileDetailsDiv active"
                : "profileDetailsDiv"
            }
            onClick={() => setSideBarPage("Account Settings")}
          >
            <FaGear className="profileDetailsIcon" />
            <p>Account Settings</p>
          </div>
          <div
            className={"profileDetailsDivLogOut"}
            onClick={() => handleLogout()}
          >
            <SlLogout className="profileDetailsIcon" id="logoutIcon" />
            <p>Log Out</p>
          </div>
        </div>
        <div className="profileMiniPagesDiv">
          {sideBarPage == "Profile Overview" && (
            <div className="profileOverviewDiv">
              <div className="profileOverview">
                <div className="profileOverviewPfp">
                  <p>{getInitials(user?.name)}</p>
                </div>
                <div className="profileOverviewDetails">
                  <h3 className="profileUsername">{user?.name}</h3>
                  <p className="profileEmail">{user?.email}</p>
                  <StyledButton onClick={() => setIsEditOpen(true)}>
                    Edit Profile
                  </StyledButton>
                </div>
                <EditProfileModal
                  open={isEditOpen}
                  onClose={() => setIsEditOpen(false)}
                />
              </div>
              <hr />
              <div className="profileUserInfo">
                <p>Phone</p>
                <h5>{user?.phoneNumber}</h5>
              </div>
              <div className="profileUserInfo">
                <p>Member Since</p>
                <h5>{user?.memberSince}</h5>
              </div>
              <div className="profileUserInfo">
                <p>Total Orders</p>
                <h5>{user?.orders?.length || 0}</h5>
              </div>
            </div>
          )}
          {sideBarPage == "My Orders" && (
            <div className="profileOrdersDiv">
              <h3>Order History</h3>
              {usersNoOrders == 0 && (
                <div className="zeroOrdersDiv">
                  <p>You have no active orders yet.</p>
                  <NavLink to={"/checkout"}>View Cart</NavLink>
                </div>
              )}
              {user?.orders?.map((orderItem) => (
                <div className="profileOrderCard">
                  <div className="profileOrderCardFlex">
                    <h4 className="profileOrderId">{orderItem.id}</h4>
                    <div className="orderStatusTextDiv">
                      <span
                        className="orderStatusText"
                        style={{
                          backgroundColor: "green",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {"Confirmed"}
                      </span>
                      <p className="orderStatusPrice">${orderItem.total}</p>
                    </div>
                  </div>
                  <p className="orderDate">{orderItem.date}</p>
                  <div className="orderProductImagesDiv">
                    {orderItem.items?.map((item) => (
                      <img
                        src={item.image}
                        alt=""
                        className="orderProductImage"
                      />
                    ))}
                  </div>
                  <div className="orderDeliveryDiv">
                    <p>
                      Delivery Date : Between {orderItem.deliveryDate} to {orderItem.deliveryDate2}
                    </p>
                  </div>
                  <div
                    className="viewOrderDetails"
                    onClick={() => toggleOrderDetails(orderItem.id)}
                  >
                    <p>View Details</p>
                    {expandedOrderId == orderItem.id ? (
                      <IoIosArrowForward />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </div>
                  {expandedOrderId == orderItem.id && (
                    <div className="viewOrderDetailsClicked">
                      <hr />
                      {orderItem.items?.map((orderProduct) => (
                        <div className="viewOrderDetailsProduct">
                          <div>
                            <h4 className="viewMoreOrderName">
                              {orderProduct.name}
                            </h4>
                            <p className="viewMoreOrderProductDetails">
                              Size : {orderProduct.selectedSize} | Color :{" "}
                              {orderProduct.selectedColor} | Qty :{" "}
                              {orderProduct.quantity}
                            </p>
                          </div>
                          <p className="viewMoreOrderProductPrice">
                            ${orderProduct.price}
                          </p>
                        </div>
                      ))}

                      <hr />
                      <div className="viewMoreOrderTotalPricesDiv">
                        <p>SubTotal</p>
                        <span>${orderItem.subtotal}</span>
                      </div>
                      <div className="viewMoreOrderTotalPricesDiv">
                        <p>Shipping</p>
                        <span>
                          {orderItem.shipping == 0
                            ? "Free"
                            : orderItem.shipping}
                        </span>
                      </div>
                      <div className="viewMoreOrderTotalPricesDiv">
                        <p style={{ color: "black", fontSize: "18px" }}>
                          Total
                        </p>
                        <span>${orderItem.total}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {sideBarPage == "Account Settings" && (
            <div className="accountSettingsSection">
              <h2>Account Settings</h2>
              <h3>Change Password</h3>
              <label className="profileLabels">Current Password</label>
              <div className="passwordDiv">
                <input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={eyeCurrentPasswordOpen == true ? "text" : "password"}
                  className={"loginInputFields"}
                />
                {eyeCurrentPasswordOpen == true ? (
                  <FaEyeSlash
                    className={"eyeIcon"}
                    onClick={() =>
                      setEyeCurrentPasswordOpen((prevValue) => !prevValue)
                    }
                  />
                ) : (
                  <FaEye
                    className={"eyeIcon"}
                    onClick={() =>
                      setEyeCurrentPasswordOpen((prevValue) => !prevValue)
                    }
                  />
                )}
              </div>
              <label htmlFor="">New Password</label>
              <div className={"passwordDiv"}>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={eyeNewPasswordOpen == true ? "text" : "password"}
                  className={"loginInputFields"}
                />
                {eyeNewPasswordOpen == true ? (
                  <FaEyeSlash
                    className={"eyeIcon"}
                    onClick={() =>
                      setEyeNewPasswordOpen((prevValue) => !prevValue)
                    }
                  />
                ) : (
                  <FaEye
                    className={"eyeIcon"}
                    onClick={() =>
                      setEyeNewPasswordOpen((prevValue) => !prevValue)
                    }
                  />
                )}
              </div>
              <label htmlFor="">Confirm New Password</label>
              <div className={"passwordDiv"}>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={eyeConfirmPasswordOpen == true ? "text" : "password"}
                  className={"loginInputFields"}
                />
                {eyeConfirmPasswordOpen == true ? (
                  <FaEyeSlash
                    className={"eyeIcon"}
                    onClick={() =>
                      setEyeConfirmPasswordOpen((prevValue) => !prevValue)
                    }
                  />
                ) : (
                  <FaEye
                    className={"eyeIcon"}
                    onClick={() =>
                      setEyeConfirmPasswordOpen((prevValue) => !prevValue)
                    }
                  />
                )}
              </div>
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
              <StyledButton onClick={() => handleChangePassword()}>
                Update Password
              </StyledButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
