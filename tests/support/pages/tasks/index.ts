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

  async toggleTask(taskName: string) {
    const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`);
    await target.click();
  }

  async shouldBeDone(taskName: string) {
    const target = this.page.getByText(taskName);
    await expect(target).toHaveCSS("text-decoration-line", "line-through");
  }

  async removeTask(taskName: string) {
    const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`);
    await target.click();
  }

  async shouldNotExistTask(taskName: string) {
     const target = this.page.locator(`css=.task-item p >> text=${taskName}`);
    await expect(target).not.toBeVisible();
  }
}