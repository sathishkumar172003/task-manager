const express = require("express");
const { body } = require("express-validator");

const {
  allTasks,
  getCreateTask,
  postCreateTask,
  getUpdatePost,
  putUpdateTask,
  deleteTask,
} = require("../controller/tasks");

const router = express.Router();

router.route("/").get(allTasks);

router
  .route("/create-task")
  .get(getCreateTask)
  .post(
    [
      body("taskName")
        .trim()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please enter valid task Name"),
    ],
    postCreateTask
  );

router
  .route("/task/:taskId")
  .get(getUpdatePost)
  .put(putUpdateTask)
  .delete(deleteTask);

module.exports = router;
