#!/usr/bin/env node

const { select, Separator,confirm } = require('@inquirer/prompts');

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
    console.log('You have to provide a name to your app.');
    console.log('For example :');
    console.log('    npx create-my-boilerplate my-app');
    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = 'https://github.com/smarthug/ultraspace-template.git';

try {
    fs.mkdirSync(projectPath);
} catch (err) {
    if (err.code === 'EEXIST') {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.log(error);
    }
    process.exit(1);
}


async function main() {
    const isWeb3 = await confirm({ message: 'is it Web3?' });

    const chain = await select({
        message: 'Select a Chain',
        choices: [
            {
                name: 'XRPL',
                value: 'XRPL',
                description: 'The XRP Ledger (XRPL) is a decentralized, public blockchain led by a global community of businesses and developers looking to solve problems and create value.',
            },
            {
                name: 'EVM',
                value: 'EVM',
                description: 'The Ethereum Virtual Machine (EVM) is a decentralized virtual environment that executes code consistently and securely across all Ethereum nodes.',
            },
            new Separator(),
            {
                name: 'Solana',
                value: 'Solana',
                disabled: '(Solana is not available)',
            },
            {
                name: 'Aptos',
                value: 'Aptos',
                disabled: '(Aptos is not available)',
            },
            {
                name: 'Cosmos',
                value: 'Cosmos',
                disabled: '(Cosmos is not available)',
            },
        ],
    });

    const gameEngine = await select({
        message: 'Select a Game Engine',
        choices: [
            {
                name: 'react-three-fiber',
                value: 'react-three-fiber',
                description: 'React-three-fiber is a React renderer for three.js. Build your scene declaratively with re-usable, self-contained components that react to state.',
            },
            {
                name: 'threejs',
                value: 'threejs',
                description: 'Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL. ',
            },
            {
                name: 'Unity',
                value: 'Unity',
                description: 'Unity is a cross-platform game engine developed by Unity Technologies',
            },
            {
                name: 'Unreal',
                value: 'Unreal',
                description: 'Unreal Engine is a 3D computer graphics game engine developed by Epic Games',
            },
            {
                name: 'Godot',
                value: 'Godot',
                description: 'Godot is a cross-platform, free and open-source game engine released under the permissive MIT license',
            }
        ],
    });
    console.log(chain, gameEngine);

    try {
        console.log('Downloading files...');
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

        process.chdir(projectPath);

        console.log('Installing dependencies...');
        execSync('npm install');

        console.log('Removing useless files')
        execSync('npx rimraf ./.git');
        fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });

        console.log('The installation is done, this is ready to use !');

    } catch (error) {
        console.log(error);
    }
}
main();