import { expect, APIRequestContext } from "@playwright/test";
import TaskModel from "../fixture/task.model";

export async function deleteTaskByHelper(request : APIRequestContext, taskName: string) {
    const deleteTask = await request.delete('http://localhost:3333/helper/tasks/' + taskName);
    expect(deleteTask.ok()).toBeTruthy();
}

export async function postTask(request : APIRequestContext, task: TaskModel) {
    const newTask = await request.post("http://localhost:3333/tasks", {
        data: task
    });
    expect(newTask.ok()).toBeTruthy();
}