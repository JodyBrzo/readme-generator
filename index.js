const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./assets/utils/generateMarkdown');

const writeFileAsync = util.promisify(fs.writeFile);

const userQuestions = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
      {
        type: 'editor',
        name: 'description',
        message: 'Enter a description of your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'editor',
        name: 'install',
        message: 'Enter installation instructions for your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'editor',
        name: 'usage',
        message: 'Enter usage instructions for your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'editor',
        name: 'contrib',
        message: 'Enter contribution guidelines for your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'list',
        name: 'license',
        message: 'Select a license for your projrct',
        choices: ['Apache License 2.0', 
          'BSD 3-Clause \'New\' or \'Revised\' license', 
          'BSD 2-Clause \'Simplified\' or \'FreeBSD\' license', 
          'GNU General Public License (GPL)', 
          'GNU Library or \'Lesser\' General Public License (LGPL)', 
          'MIT license', 
          'Mozilla Public License 2.0', 
          'Common Development and Distribution License', 
          'Eclipse Public License version 2.0',],
      },
      {
        type: 'input',
        name: 'gitHub',
        message: 'Enter your GitHub Username.',
      },      
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email address.',
      },
    ]);
};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

  try {
    await writeFileAsync(fileName, data);

    console.log('Your Readme.md is complete!');
  } catch (err) {
    console.log(err);
    console.log('There was an error writing your file');
  }
}

// TODO: Create a function to initialize app
// Bonus using async/await and try/catch
const init = async () => {
  console.log('Welcome to the README.md generator');
  try {
    const answers = await userQuestions();
    const md = generateMarkdown.generateMarkdown(answers);
    writeToFile('README.md', md);  
  } catch (err) {
    console.log(err);
    console.log('There was an error with user input');
  }
};

// Function call to initialize app
init();