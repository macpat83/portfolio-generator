const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');
const fs = require('fs');


const promptUser = () => { 

  return inquirer.prompt([

    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your Github Username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your github username!');
          return false;
        }
        }
    },

    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {

      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout}) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }

    }

  ]);

};


const promptProject = portfolioData => {
  //If there's no 'projects' array property, create me
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`

  ==================

  Add a New Project 

  ==================
  
  `);

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a description of your project!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']

    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the Github link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('Please enter a link to yout project!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }

  ])

    .then(projectData => {
      portfolioData.projects.push(projectData)
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData)
      } else {
        return portfolioData
      }
    });
};



promptUser()
.then(promptProject)
.then(portfolioData => {
  const pageHTML = generatePage(portfolioData);

  fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw new Error(err);

  //   console.log('Page created! Check out index.html in this directory to see it!');
  // });
});

  
  
// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);




// fs.writeFile('./index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');

});