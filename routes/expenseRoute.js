const express = require("express");
const router = express.Router();
const expensesController = require("../controllers/expensesController");
const { validateExpense } = require("../middleware/validation");
const protect = require("../middleware/authMiddleware");


router.use(protect);

router.get("/", expensesController.getExpenses);


router.post("/", validateExpense, expensesController.addExpense);


router.patch("/:id", validateExpense, expensesController.updateExpense);


router.delete("/:id", expensesController.deleteExpense);


module.exports = router;
