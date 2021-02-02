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
        message: 'Enter a description of your project?',
      },

  ]);
};

const generateHTML = (answers) =>
`# ${answers.title}

## Description
${answers.description}


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