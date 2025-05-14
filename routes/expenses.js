const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');  // 👈 import model

// GET all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// POST new expense
router.post('/', async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const newExpense = new Expense({
            amount,
            category,
            description,
            date
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create expense' });
    }
});

// GET single expense
router.get('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });
        res.json(expense);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// PUT update expense
router.put('/:id', async (req, res) => {
    try {
        const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Expense not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update expense' });
    }
});

// DELETE expense
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Expense.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Expense not found' });
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

module.exports = router;
