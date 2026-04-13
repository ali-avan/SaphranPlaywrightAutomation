import { Then, When } from '@cucumber/cucumber';
import { ProjectsPage } from '../pages/ProjectsPage';

let projectsPage: ProjectsPage;

function getProjectsPage(page: any): ProjectsPage {
  return projectsPage ?? (projectsPage = new ProjectsPage(page));
}

When('User navigates to the Projects page from System Admin menu', async function () {
  projectsPage = getProjectsPage(this.page);
  await projectsPage.navigateToProjectsPage();
});

Then('Projects page should load successfully', async function () {
  projectsPage = getProjectsPage(this.page);
  await projectsPage.verifyProjectsPageLoaded();
});
