const express = require("express");
const {
  registerBankUser,
  loginBankUser,
  logoutBankUser,
//   forgotPassword,
//   resetPassword,
getbankUserDetails,
//   updatePassword,
//   updateProfile,
//   getAllUser,
//   getSingleUser,
//   updateUserRole,
//   deleteUser,
} = require("../controllers/bankUserController");
const { isAuthenticatedUser, isAuthenticatedbankUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/bankuser/register").post(registerBankUser);

router.route("/bankuser/login").post(loginBankUser);

// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

 router.route("/bankuser/logout").get( logoutBankUser);

router.route("/bankuser/me").get(isAuthenticatedUser,isAuthenticatedbankUser, getbankUserDetails);

// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

// router
//   .route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
