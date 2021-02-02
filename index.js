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
        type: 'input',
        name: 'description',
        message: 'Enter a description of your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'input',
        name: 'install',
        message: 'Enter installation instructions for your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Enter usage instructions for your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'input',
        name: 'contrib',
        message: 'Enter contribution guidelines for your project.  Be sure to save before closing the editor when you are done.',
      },
      {
        type: 'list',
        name: 'license',
        message: 'Select a license for your projrct',
        choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0','GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense'],
      },
  ]);
};

const generateHTML = (answers) =>

`# ${answers.title}

![mit](https://img.shields.io/badge/license-MIT-brightgreen)

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

## License
Licensed under the ${answers.license}





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