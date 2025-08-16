const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },

    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [100, "Title cannot exceed 100 characters."],
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [1, "Amount must be greater than 0."],
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      enum: {
        values: [
          "Food",
          "Transport",
          "Shopping",
          "Entertainment",
          "Bills",
          "Healthcare",
          "Others",
        ],
        message:
          "Category must be one of: Food, Transport, Shopping, Entertainment, Bills, Healthcare, Others.",
      },
      default: "Others",
    },

    date: {
      type: Date,
      required: [true, "Date is required."],
      default: Date.now,
    },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

expenseSchema.index({ user: 1, date: -1, category: 1 });

module.exports = mongoose.model("Expense", expenseSchema);
