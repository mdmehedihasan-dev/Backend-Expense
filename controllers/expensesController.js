const Expense = require("../models/expenseModel");


// ================controller for get ================
exports.getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    let filter = { user: req.user._id }; 

    if (category && category !== "all") {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(filter).sort({ date: -1 });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.json({
      expenses,
      total,
      count: expenses.length,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// ================controller for add ================
exports.addExpense = async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      user: req.user._id, 
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(400).json({ error: error.message });
  }
};

