import { test, expect } from "@playwright/test";
import TaskModel from "./fixture/task.model";
import { deleteTaskByHelper, postTask } from "./support/helpers";



test("refactored: should create a new task, and should not create a task that exists (with api call)", async ({
  page,
  request,
}) => {
  const task : TaskModel = {
    name: "New Task from Playwright 4.0",
    is_done: false,
  };
 
  await deleteTaskByHelper(request, task.name);

  await postTask(request, task);
  

  await page.goto("http://localhost:8080");

  const inputTaskName = page.locator("#newTask");
  await inputTaskName.fill(task.name);
  await page.click("css=button >> text=Create");

  const errorModal = page.locator(".swal2-html-container");
  await expect(errorModal).toBeVisible();
  await expect(errorModal).toHaveText("Task already exists!");

  await deleteTaskByHelper(request, task.name);
});