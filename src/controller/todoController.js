import responseStructure from "../../utils/responseStructure.js";
import todoSchema from "../schema/todoSchema.js";
import mongoose from "mongoose";

export const addTodo = async (data, cb) => {
  try {
    const user_id = data.user._id;
    const { title, description, complete_date } = data;

    if (!title || !description || !complete_date)
      throw new Error("params missing");

    const newTodo = new todoSchema({
      title,
      description,
      complete_date: new Date(complete_date),
      user_id,
    });

    await newTodo.save();

    return cb(
      null,
      responseStructure
        .merge({
          success: true,
          status: 200,
          message: "todo added successfully",
        })
        .toJS()
    );
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};

export const getAllTodo = async (data, cb) => {
  try {
    const whereData = {
      user_id: new mongoose.Types.ObjectId(data.user._id),
    };

    const todos = await todoSchema.find(whereData);

    return cb(
      null,
      responseStructure
        .merge({
          success: true,
          status: 200,
          message: "todos retrieved successfully",
          data: todos,
        })
        .toJS()
    );
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};

export const getTodoById = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");
    const todos = await todoSchema.findById(data.id);

    return cb(
      null,
      responseStructure
        .merge({
          success: true,
          status: 200,
          message: "todos retrieved successfully",
          data: todos,
        })
        .toJS()
    );
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};

export const updateTodo = async (data, cb) => {
  try {
    if (!data.updateData || !data.id) throw new Error("params missing");
    if (data.updateData.complete_date) {
      data.updateData.complete_date = new Date(data.updateData.complete_date);
    }

    const updatedTodo = await todoSchema.findByIdAndUpdate(
      data.id,
      data.updateData,
      { new: true }
    );
    return cb(
      null,
      responseStructure
        .merge({
          success: true,
          status: 200,
          message: "todo updated successfully",
          data: updatedTodo,
        })
        .toJS()
    );
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};

export const deleteTodo = async (data, cb) => {
  try {
    if (!data.id) throw new Error("Params missing");

    await todoSchema.findByIdAndDelete(data.id);

    return cb(
      null,
      responseStructure
        .merge({
          success: true,
          status: 200,
          message: "todo deleted successfully",
        })
        .toJS()
    );
  } catch (error) {
    return cb(
      responseStructure
        .merge({
          success: false,
          status: 500,
          message: error.message,
        })
        .toJS()
    );
  }
};
