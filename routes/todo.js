const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 할일 전체 조회
router.get('/', async (_req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 할일 삭제
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: '삭제완료' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
