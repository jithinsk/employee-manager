const express = require("express");
const { validator } = require("../middleware/validator");
const { auth } = require("../middleware/auth");
const { signInSchema, signUpSchema, employeeSchema } = require("../schema");
const {
  addNewEmployee,
  updateExistingEmployee,
  deleteExistingEmployee,
  searchEmployees,
} = require("../handler/employee");
const { getStats } = require("../handler/stats");
const { createUserAccount, signInWithAccount } = require("../handler/user");

const router = express.Router();

router.post("/login", validator(signInSchema), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await signInWithAccount(username, password);
    return res.status(200).send({
      status: 200,
      message: "success",
      data: {
        user: {
          username,
          token,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", validator(signUpSchema), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await createUserAccount(username, password);
    return res.status(200).send({
      status: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/stats", auth, async (req, res, next) => {
  try {
    const data = await getStats(req.userID);
    return res.status(200).send({
      status: 200,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/employees", auth, async (req, res, next) => {
  try {
    const data = await searchEmployees(req.query);
    return res.status(200).send({
      status: 200,
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/employees",
  auth,
  validator(employeeSchema),
  async (req, res, next) => {
    try {
      await addNewEmployee(req.body, req.userID);
      return res.status(200).send({
        status: 200,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/employees/:id",
  auth,
  validator(employeeSchema),
  async (req, res, next) => {
    try {
      await updateExistingEmployee(req.params.id, req.body);
      return res.status(200).send({
        status: 200,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/employees/:id", auth, async (req, res, next) => {
  try {
    await deleteExistingEmployee(req.params.id);
    return res.status(200).send({
      status: 200,
      message: "success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
