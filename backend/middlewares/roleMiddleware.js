var jwt = require("jsonwebtoken");
const roleCheck = (roles) => {
  return async (req, res, next) => {
    const userRole = req.headers.role;

    // console.log(userToken)
    if (!userRole) {
      return res.send({ messsage: "Invalid Role" });
    }
    try {
  
      if (roles.includes(userRole)) {
        req.userRole = userRole;     

        next();
      }
    } catch (error) {
      console.log(error);
      res.send({ messsage: "error while role verification" });
    }
  };
};

module.exports = roleCheck;
