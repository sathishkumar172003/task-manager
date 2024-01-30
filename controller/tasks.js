const Task = require("../model/task");
const { validationResult } = require("express-validator");

const allTasks = async (req, res, next) => {
  const updateMsg = req.flash("updateSuccess");

  try {
    let tasks = await Task.find({ user: req.user._id });
    res.render("./task/my-tasks.ejs", {
      req: req,
      tasks: tasks,
      updateMsg: updateMsg,
    });
  } catch (e) {
    console.log(e);
  }
};

const getCreateTask = async (req, res, next) => {
  res.render("./task/my-tasks.ejs", { req: req });
};

const postCreateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    req.flash("taskValidationError", errors.array()[0].msg);
    return res.json({ message: "failed", data: errors.array()[0].msg });
  }

  try {
    let task = await Task.create({
      taskName: req.body.taskName,
      status: req.body.status,
      user: req.user._id,
    });
    return res.json({ message: "success", data: task });
  } catch (e) {
    console.log("error occuresd" + e);
  }
};

const getUpdatePost = async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    let task = await Task.findOne({ _id: taskId });
    res.render("./task/update-task.ejs", { req: req, task: task });
  } catch (e) {
    console.log(e);
  }
};

const putUpdateTask = async (req, res, next) => {
  console.log(req.body);
  const taskId = req.params.taskId;
  try {
    let task = await Task.findOneAndUpdate(
      { _id: taskId },
      { taskName: req.body.taskName, status: req.body.status },
      { new: true, runValidator: true }
    );

    req.flash("updateSuccess", `task ${task.taskName} updated successfully`);
    res.redirect("/tasks");
  } catch (e) {}
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    let task = await Task.findOneAndDelete({ _id: taskId });
    console.log(task);
    req.flash("deleteSucess", `task ${task.taskName} deleted successfully`);
    res.redirect("/tasks");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  allTasks,
  getCreateTask,
  postCreateTask,
  getUpdatePost,
  putUpdateTask,
  deleteTask,
};
