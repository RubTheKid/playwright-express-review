import { test, expect } from '@playwright/test';
// import { faker } from '@faker-js/faker';

test('should create a new task', async ({ page, request }) => {
    // const { faker } = await import('@faker-js/faker');

    //the new task that i want to include
    // const taskName = faker.lorem.words();
    const taskName = 'New Task from Playwright';

    //in this page
    await page.goto('http://localhost:8080');

    //when i fill the input with the task
    const inputTaskName = page.locator('#newTask');
    await inputTaskName.fill(taskName);
    //send the form/register the task
    await page.click('css=button >> text=Create');
    //i expect to see the task in the list
    const target = page.locator('css=.task-item p >> text=', { hasText: taskName });
    await expect(target).toBeVisible();
    //clean up - delete the task
    // await request.delete(`http://localhost:3333/helper/tasks/${taskName}`);
});

test('should not create a task that exists', async({ page}) => {
    const taskName = 'New Task from Playwright';
    await page.goto('http://localhost:8080');

    const inputTaskName = page.locator('#newTask');
    await inputTaskName.fill(taskName);

    
    await page.click('css=button >> text=Create'); 

    // const target = page.locator('.swal2-html-container >> text=Task already exists');
     const target = page.locator('.swal2-html-container');
     await expect(target).toHaveText('Task already exists!');

     await expect(target).toBeVisible();
});

//em testes automatizados, evite usar dados dinamicos como faker, pois se o teste falhar, fica dificil debugar
//prefira dados estaticos, que facilitem a reexecucao do teste
//porem, se for usar dados dinamicos, faca o cleanup no final do teste, para evitar dados duplicados
//pode ser interessante criar um endpoint so para testes, que faca o cleanup dos dados criados no teste
//o ideal no entanto, eh que cada teste seja independente, e faca seu proprio setup e cleanup
//ou seja, se o teste precisa de um usuario, que ele crie o usuario no inicio do teste, e delete no final
//assim, cada teste pode ser executado isoladamente, sem depender de outros testes
//isso tambem facilita a execucao paralela dos testes

test('should create a new task, and should not create a task that exists', async({ page}) => {
    const taskName = 'New Task from Playwright2.0';
    await page.goto('http://localhost:8080');

    const inputTaskName = page.locator('#newTask');
    await inputTaskName.fill(taskName);
    await page.click('css=button >> text=Create'); 
    const target = page.locator('css=.task-item p >> text=', { hasText: taskName });
    await expect(target).toBeVisible();
     await inputTaskName.fill(taskName);

    
    await page.click('css=button >> text=Create'); 
     const error = page.locator('.swal2-html-container');
     await expect(error).toHaveText('Task already exists!');
     await expect(error).toBeVisible();
     await expect(target).toBeVisible();
});