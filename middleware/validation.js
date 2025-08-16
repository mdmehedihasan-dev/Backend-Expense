const { body, validationResult } = require("express-validator");


const ALLOWED_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Healthcare",
  "Others",
];

const validateExpense = [
  //=========== Validate title ==============
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required.") 
    .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters long."),

  //  ============== Validate amount ===============
  body("amount")
    .notEmpty().withMessage("Amount is required.") 
    .isFloat({ min: 1 }).withMessage("Amount must be a positive number greater than 0."), 

  // ============== Validate category ================
  body("category")
    .notEmpty().withMessage("Category is required.") 
    .isIn(ALLOWED_CATEGORIES) 
    .withMessage(`Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}`),

  // ========== Validate date ===============
  body("date")
    .notEmpty().withMessage("Date is required.") 
    .isISO8601().withMessage("Date must be a valid ISO 8601 date.") 
    .toDate(), 

  // ===========  check for validation error  ===================
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map(err => ({
          field: err.param, 
          message: err.msg  
        })),
      });
    }
    next(); 
  },
];

module.exports = { validateExpense };
