import { Request, Response } from "express";
import TodoModel, { ITodo } from "../models/todo.model";

export const listTodos = async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter || "all";
    const todos = filter === "done"
    ? await TodoModel.find({ isDone: true })
    : filter === "upcoming"
      ? await TodoModel.find({ isDone: false, date: { $gte: new Date() } }).sort({ date: 1 })
      : await TodoModel.find();
    
      if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
        return res.render("partials/todo-list", { todos });
      }

  res.render("list", { todos });
  } catch (error) {
    res.status(400).send("Error listing Todos");
  }
};

// Add Todo
export const addTodo = async (req: Request, res: Response) => {

  const { name, description, date } = req.body as { name: string, description: string, date: Date };
  try {
    const todo = await TodoModel.create({ name, description, date });
    await todo.save();
    res.redirect("/todos");
  } catch (err) {
    res.status(400).send("Error saving Todo");
  }
};

// Update Todo
export const updateTodo = async (req: Request, res: Response) => {
  const { name, description, date, isDone } = req.body;

  try {
    await TodoModel.findByIdAndUpdate(req.params.id, { name, description, date, isDone });
    res.redirect("/todos");
  } catch (err) {
    res.status(400).send("Error updating Todo");
  }
};

// Delete Todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await TodoModel.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (err) {
    res.status(400).send("Error deleting Todo");
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const currentTodo = await TodoModel.findById(id) as ITodo;
    await TodoModel.findByIdAndUpdate(id, { isDone:  !currentTodo.isDone });
    res.redirect("/todos");
  } catch (err) {
    res.status(400).send("Error toggling Todo");
  }
};