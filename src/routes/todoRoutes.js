import express from "express";
import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
} from "../controller/todoController.js";
const router = express.Router();
import { authenticate } from "../../middlewares/authMiddleware.js";

router.post("/add_todo", authenticate, (req, res) => {
  const data = req.body;
  data.user = req.user;
  addTodo(data, (err, response) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(response.status).send(response);
    }
  });
});

router.get("/get_all_todo", authenticate, (req, res) => {
  const data = req.query;
  data.user = req.user;
  getAllTodo(data, (err, response) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(response.status).send(response);
    }
  });
});

router.get("/get_todo_by_id", authenticate, (req, res) => {
  const data = req.query;
  data.user = req.user;
  getTodoById(data, (err, response) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(response.status).send(response);
    }
  });
});

router.patch("/update_todo", authenticate, (req, res) => {
  const data = { ...req.body, ...req.query };
  data.user = req.user;
  updateTodo(data, (err, response) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(response.status).send(response);
    }
  });
});

router.put("/delete_todo", authenticate, (req, res) => {
  const data = req.query;
  data.user = req.user;
  deleteTodo(data, (err, response) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(response.status).send(response);
    }
  });
});

export default router;
