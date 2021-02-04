const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const licenses = [
    { name: "Apache License 2.0", abbr: "Apache" },
    { name: "GNU General Public License v3.0", abbr: "GNU" },
    { name: "MIT License", abbr: "MIT" },
    { name: "BSD 2-Clause \"Simplified\" License", abbr: "BSD" },
    { name: "BSD 3-Clause \"New\" or \"Revised\" License", abbr: "BSD" },
    { name: "Boost Software License 1.0", abbr: "Boost" },
    { name: "Creative Commons Zero v1.0 Universal", abbr: "Creative" },
    { name: "Eclipse Public License 2.0", abbr: "Eclipse" },
    { name: "GNU Affero General Public License v3.0", abbr: "GNU" },
    { name: "GNU General Public License v2.0", abbr: "GNU" },
    { name: "GNU Lesser General Public License v2.1", abbr: "GNU" },
    { name: "Mozilla Public License 2.0", abbr: "Mozilla" },
    { name: "The Unlicense", abbr: "UNI" }
  ];

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
        'GNU General Public License v3.0', 
        'MIT License', 
        'BSD 2-Clause "Simplified" License', 
        'BSD 3-Clause "New" or "Revised" License', 
        'Boost Software License 1.0', 
        'Creative Commons Zero v1.0 Universal', 
        'Eclipse Public License 2.0', 
        'GNU Affero General Public License v3.0',
        'GNU General Public License v2.0', 
        'GNU Lesser General Public License v2.1', 
        'Mozilla Public License 2.0', 'The Unlicense'],
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

const getLicense = (answers) =>
{
    //I need to compare the selected license value from answers to that in the licenses object to select the abbr so I can set the badge
    for (const lics of licenses) {
        if (lics.name === answers.license)
        return lics.abbr;
      }
};

const generateMD = (answers, licenseAbbr) => 

`# ${answers.title}

 ![mit](https://img.shields.io/badge/license-${licenseAbbr}-brightgreen)

## Description
${answers.description}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [License](#License)
* [Questions](#Questions)

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

## Questions
You can view my GitHub profile at https://github.com/${answers.gitHub}

If you have additonal queations you can email me at ${answers.email} 

`;

// Bonus using async/await and try/catch
const init = async () => {
  console.log('Welcome to the README.md generator');
  try {
    const answers = await userQuestions();

  } catch (err) {
    console.log(err);
    console.log("There was an error with user input");
  }
  try {
    let licenseAbbr = getLicense(answers);
    
    const md = generateMD(answers, licenseAbbr);

    await writeFileAsync('README.md', md);

    console.log('Your Readme.md is complete!');
  } catch (err) {
    console.log(err);
    console.log("There was an error writing your file");
  }
};

init();