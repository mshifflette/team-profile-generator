const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateHTML = require("./util/generateHtml");

const employeeArray = [];
const managerArray = [];
const engineerArray = [];
const internArray = [];


function addManager() {
    inquirer.prompt([
        {
        message:"What is the Team Manager's Name?",
        type: "input",
        name:"managerName",
        },
        {
        message:"What is the their Employee ID?",
        type: "input",
        name:"managerId"
        },
        {
        message:"What is the their E-Mail?",
        type: "input",
        name:"managerEmail"
        },
        {
        message:"What is the their Office Number?",
        type: "input",
        name:"managerOffice"
        }
    ])
    .then(managerAnswers => {
        const newManager = new Manager(managerAnswers.managerName, managerAnswers.managerId, managerAnswers.managerEmail, managerAnswers.managerOffice);
        employeeArray.push(newManager);
        managerArray.push(newManager);
        askEngineerOrIntern();
    })
}

function askEngineerOrIntern() {
    inquirer.prompt(
        {
        message:"Add Engineer or Intern?",
        type: "list",
        name:"teamChoice",
        choices:["Add an Engineer","Add an Intern", "Team is complete!"]
        })
        .then(answers => {
        switch (answers.teamChoice) {
            case "Add an Engineer":
                console.log("Adding an Engineer!")
                addEngineer();
                break;
            case "Add an Intern":
                console.log("Adding an Intern!")
                addIntern();
                break;
            default:
                fs.writeFile(`MyTeam.html`, generateHTML(employeeArray),
                 (err) =>
                err ? console.error(err) : console.log('HTML Created!')
                );
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
        message:"What is the Engineer's Name?",
        type: "input",
        name:"engineerName",
        },
        {
        message:"What is the their Employee ID?",
        type: "input",
        name:"engineerId"
        },
        {
        message:"What is the their E-Mail?",
        type: "input",
        name:"engineerEmail"
        },
        {
        message:"What is the their GitHub Username?",
        type: "input",
        name:"engineerGitHub"
        }
    ]).then(engineerAnswers => {
        const newEngineer = new Engineer(engineerAnswers.engineerName, engineerAnswers.engineerId, engineerAnswers.engineerEmail, engineerAnswers.engineerGitHub);
        employeeArray.push(newEngineer);
        engineerArray.push(newEngineer);
        askEngineerOrIntern();
    })

}

function addIntern() {
    inquirer.prompt([
        {
        message:"What is the Intern's Name?",
        type: "input",
        name:"internName",
        },
        {
        message:"What is their Employee ID?",
        type: "input",
        name:"internId"
        },
        {
        message:"What is their E-Mail?",
        type: "input",
        name:"internEmail"
        },
        {
        message:"What is their School?",
        type: "input",
        name:"internSchool"
        }
    ])
    .then(internAnswers => {
        const newIntern = new Intern(internAnswers.internName, internAnswers.internId, internAnswers.internEmail, internAnswers.internSchool);
        employeeArray.push(newIntern);
        internArray.push(newIntern);
        askEngineerOrIntern();
    })
}

addManager();