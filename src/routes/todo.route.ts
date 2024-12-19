import { Router} from "express";
import {
  listTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
} from "../controllers/todo.controller";
import { validateToDoMiddleware } from "../validators/todo.validator";

const router : Router = Router();

router.get("/", listTodos);
router.post("/", validateToDoMiddleware, addTodo);
router.put("/:id", validateToDoMiddleware, updateTodo);
router.delete("/:id", deleteTodo);
router.put("/:id/toggle", toggleTodo);

export const todoRoutes = router;
