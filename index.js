const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
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

  ]);
};

const generateHTML = (answers) =>
`# ${answers.title}

## Description
${answers.description}

## Installation
${answers.install}

## Usage
${answers.usage}

## Contributing
${answers.description}

## Tests
${answers.contrib}


`;

// Bonus using async/await and try/catch
const init = async () => {
  console.log('Welcome to the README.md generator');
  try {
    const answers = await promptUser();

    const md = generateHTML(answers);

    await writeFileAsync('README.md', md);

    console.log('Successfully wrote to Readme.md');
  } catch (err) {
    console.log(err);
  }
};

init();