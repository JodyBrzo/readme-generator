// TODO: Create a function that returns a license badge based on which license is passed in

const licenses = [
  { name: 'Apache License 2.0', abbr: 'Apache', url: 'https://opensource.org/licenses/Apache-2.0'},
  { name: 'GNU General Public License v3.0', abbr: 'GNU' },
  { name: 'MIT License', abbr: 'MIT' },
  { name: 'BSD 2-Clause \'Simplified\' License', abbr: 'BSD' },
  { name: 'BSD 3-Clause \'New\' or \'Revised\' License', abbr: 'BSD' },
  { name: 'Boost Software License 1.0', abbr: 'Boost' },
  { name: 'Creative Commons Zero v1.0 Universal', abbr: 'Creative' },
  { name: 'Eclipse Public License 2.0', abbr: 'Eclipse' },
  { name: 'GNU Affero General Public License v3.0', abbr: 'GNU' },
  { name: 'GNU General Public License v2.0', abbr: 'GNU' },
  { name: 'GNU Lesser General Public License v2.1', abbr: 'GNU' },
  { name: 'Mozilla Public License 2.0', abbr: 'Mozilla' },
  { name: 'The Unlicense', abbr: 'UNI' }
];


// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let lic = findLicense(license);
  return lic ? `https://img.shields.io/static/v1?label=license&message=${lic.abbr}&color=brightgreen` : ''; 
}

const findLicense = (license) => {
  for (lic of licenses) {
    if (lic.name === license)
    return lic;
  }} 

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
function generateMarkdown(data) {
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

module.exports = generateMarkdown;
