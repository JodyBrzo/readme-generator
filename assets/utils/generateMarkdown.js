const licenses = [  //license array to build the badge icon
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


//compare license selected by user and return the matching license from the above licences array
const findLicense = (license) => {
  for (lic of licenses) {
    if (lic.name === license)
    return lic;
  }}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let lic = findLicense(license);
  return lic ? `![license](https://img.shields.io/static/v1?label=license&message=${lic.abbr}&color=brightgreen)` : ''; 
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
    //I need to compare the selected license value from answers to that in the licenses object to select the abbr so I can set the badge
    let lic = findLicense(license);
    return lic ? lic.url : ''; 
  }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let lic = findLicense(license);
  return lic ? `Licensed under the ${lic.name} License` : ''; 
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = (data) => {
  const licenseLink = renderLicenseLink(data.license);
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseSection = renderLicenseSection(data.license);

  return `# ${data.title}

  ${licenseBadge}
 
 ## Description
 ${data.description}
 
 ## Table of Contents
 
 * [Installation](#installation)
 * [Usage](#usage)
 * [Contributing](#Contributing)
 * [Tests](#Tests)
 * [License](#License)
 * [Questions](#Questions)
 
 ## Installation
 ${data.install}
 
 ## Usage
 ${data.usage}
 
 ## Contributing
 ${data.description}
 
 ## Tests
 ${data.contrib}
 
 ## License
${licenseSection}

${licenseLink}
 
 ## Questions
 You can view my GitHub profile at https://github.com/${data.gitHub}
 
 If you have additonal queations you can email me at ${data.email} `;
}

//export the generateMarkdown function
module.exports.generateMarkdown = generateMarkdown;