import { expect, Locator, Page } from "@playwright/test";
import TaskModel from "../../../fixture/task.model";

export class TasksPage {
  readonly page: Page;
  readonly inputTaskName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputTaskName = page.locator("#newTask");
  }

  async go() {
    await this.page.goto("http://localhost:8080");
  }

  async create(task: TaskModel) {
    await this.inputTaskName.fill(task.name);
    await this.page.click("css=button >> text=Create");
  }

  async shouldHaveTask(taskName: string) {
    const target = this.page.locator(`css=.task-item p >> text=${taskName}`);
    await expect(target).toBeVisible();
  }

  async alertHaveText(text: string) {
    const errorModal = this.page.locator(".swal2-html-container");
    await expect(errorModal).toBeVisible();
    await expect(errorModal).toHaveText(text);
  }
}
