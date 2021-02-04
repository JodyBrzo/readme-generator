const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const licenses = [
  { name: 'Apache License 2.0', abbr: 'Apache', url: 'https://opensource.org/licenses/Apache-2.0'},
  { name: 'BSD 3-Clause \'New\' or \'Revised\' license', abbr: 'BSD', url: 'https://opensource.org/licenses/BSD-3-Clause'},
  { name: 'BSD 2-Clause \'Simplified\' or \'FreeBSD\' license', abbr: 'BSD', url: 'https://opensource.org/licenses/BSD-2-Clause'},
  { name: 'GNU General Public License (GPL)', abbr: 'GNU', url: 'GNU General Public License (GPL)'},
  { name: 'GNU Library or \'Lesser\' General Public License (LGPL)', abbr: 'GNU', url: 'https://opensource.org/licenses/lgpl-license'},
  { name: 'MIT license', abbr: 'MIT', url: 'https://opensource.org/licenses/MIT'},
  { name: 'Mozilla Public License 2.0', abbr: 'Mozilla', url: 'https://opensource.org/licenses/MPL-2.0'},
  { name: 'Common Development and Distribution License', abbr: 'CDDL', url: 'https://opensource.org/licenses/CDDL-1.0'},
  { name: 'Eclipse Public License version 2.0', abbr: 'Eclipse', url: 'https://opensource.org/licenses/EPL-2.0'},
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
        'BSD 3-Clause \'New\' or \'Revised\' license', 
        'BSD 2-Clause \'Simplified\' or \'FreeBSD\' license', 
        'GNU General Public License (GPL)', 
        'GNU Library or \'Lesser\' General Public License (LGPL)', 
        'MIT license', 
        'Mozilla Public License 2.0', 
        'Common Development and Distribution License', 
        'Eclipse Public License version 2.0'],
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