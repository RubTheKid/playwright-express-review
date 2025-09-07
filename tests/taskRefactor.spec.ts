import { test, expect } from "@playwright/test";
import TaskModel from "./fixture/task.model";
import { deleteTaskByHelper, postTask } from "./support/helpers";
import { TasksPage } from "./support/pages/tasks/index";

test("refactored: should create a new task, and should not create a task that exists (with api call)", async ({
  page,
  request,
}) => {
  const task: TaskModel = {
    name: "New Task from Playwright 4.0",
    is_done: false,
  };

  await deleteTaskByHelper(request, task.name);
   

  const tasksPage: TasksPage = new TasksPage(page);

  await tasksPage.go();
  
  await tasksPage.create(task);
  
  await tasksPage.shouldHaveTask(task.name);
  await tasksPage.create(task);
  await tasksPage.shouldHaveTask(task.name);
  await tasksPage.alertHaveText("Task already exists!");
  await deleteTaskByHelper(request, task.name);
});

test("required field", async ({ page }) => {
  const task: TaskModel = {
    name: "",
    is_done: false,
  };

  const tasksPage: TasksPage = new TasksPage(page);

  await tasksPage.go();
  await tasksPage.create(task);

  const validationMessage = await tasksPage.inputTaskName.evaluate(
    (e) => (e as HTMLInputElement).validationMessage
  );
  expect(validationMessage).toEqual("This is a required field");
});
