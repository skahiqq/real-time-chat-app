#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const RESET = '\x1b[0m';
const BLUE = '\x1b[34m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const parseArgs = () => {
    const args = process.argv.slice(2);
    const command = args[0];
    const name = args[1];
    const options = {};

    args.forEach((arg) => {
        if (arg === '-r' || arg === '--resource') {
            options.resource = true;
        }
    });

    return {command, name, options};
};

const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const ensureDirSync = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
};

const generateController = (name) => {
    const controllerTemplate = `
    const Model = require('../models/${name}');

exports.all = async (req, res) => {
    const data = {};

    res.send({data});
};

exports.store = async (req, res) => {
    const data = {};

    res.send({data});
};

exports.update = async (req, res) => {
    const data = {};

    res.send({data});
}
  `;

    fs.writeFileSync(path.join(__dirname, `app/controllers/${name}Controller.js`), controllerTemplate.trim());
    console.log('\n');
    console.log(`${BLUE}[INFO]${RESET} Controller [app/controllers/${name}Controller.js] created successfully`);
    console.log('\n');
};

const generateModel = async (name, options) => {
    const modelTemplate = `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${name}Schema = new Schema({
// fields here
});

module.exports = mongoose.model('${name}', ${name}Schema);
  `;

    const modelPath = `app/models/${name}.js`;
    fs.access(modelPath, fs.constants.F_OK, async (err) => {
        if (err) {
            console.log('\n');
            console.log(`${BLUE}[INFO]${RESET} Model [app/models/${name}.js] created successfully`);
            console.log('\n');
            fs.writeFileSync(path.join(__dirname, modelPath), modelTemplate.trim());

            if (options.resource) {
                generateController(name);
            }
        } else {
            console.log('\n');
            console.log(`${RED}[ERROR]${RESET} Model [app/models/${name}.js] exists.`);

            if (options.resource) {
                const controllerPath = `app/controllers/${name}Controller.js`;

                fs.access(controllerPath, fs.constants.F_OK, async (err) => {
                    if (err) {
                        try {
                            const wantToCreateController = await askQuestion(`Do you want to create controller ${GREEN}Y${RESET} / N `);
                            if (wantToCreateController.toLowerCase() !== 'no' && wantToCreateController.toLowerCase() !== 'n') {
                                generateController(name);
                            }
                        } finally {
                            rl.close();
                        }
                    } else {
                        console.log(`${RED}[ERROR]${RESET} Controller [app/controllers/${name}Controller.js] exists.`);
                        console.log('\n');
                    }
                });
            }
            console.log('\n');
        }
    });
};

// Ensure the directories exist using native fs module
ensureDirSync(path.join(__dirname, 'app/controllers'));
ensureDirSync(path.join(__dirname, 'app/models'));

const {command, name, options} = parseArgs();

switch (command) {
    case 'make:controller':
        generateController(name);
        break;
    case 'make:model':
        generateModel(name, options).then(() => rl.close());
        break;
        case 'help':
        console.log(`
Usage: mycli <command> [options]

Commands:
  make:controller <name>    Create a new controller
  make:model <name>         Create a new model
  help                      Display help information

Options:
  -r, --resource            Create a resource controller along with the model
`);
            rl.close();
            break;
    default:
        console.error('Unknown command type: mycli help  for more info' +
            '');
        // create:controller <name>
        //   create:model <name>
        rl.close();
        break;
}
