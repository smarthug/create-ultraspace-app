// #!/usr/bin/env node

// const inquirer = require('inquirer');
// const fs = require('fs-extra');
// const path = require('path');

// // 사용자에게 질문을 합니다.
// const questions = [
//     {
//         type: 'confirm',
//         name: 'isWeb3',
//         message: 'Is it a Web3 project?',
//         default: false,
//     },
// ];

// // 프로젝트를 생성하는 함수
// const createProject = async (projectName) => {
//     try {
//         // 사용자가 입력한 정보를 받아옵니다.
//         const answers = await inquirer.prompt(questions);

//         // 프로젝트 폴더 경로 설정
//         const projectPath = path.join(process.cwd(), projectName);

//         // 프로젝트 폴더 생성
//         await fs.ensureDir(projectPath);

//         // 간단한 예제 파일을 생성
//         const packageJson = {
//             name: projectName,
//             version: '1.0.0',
//             description: `${projectName} project`,
//             scripts: {
//                 start: 'node index.js',
//             },
//             dependencies: {},
//         };

//         // 웹3 프로젝트인지 여부에 따라 추가 설정
//         if (answers.isWeb3) {
//             packageJson.dependencies['web3'] = '^1.6.0';  // 웹3 라이브러리 추가
//         }

//         // package.json 파일 작성
//         await fs.writeJson(path.join(projectPath, 'package.json'), packageJson, { spaces: 2 });

//         // 간단한 index.js 파일 작성
//         const indexJsContent = `
// console.log('Welcome to ${projectName}!');

// ${answers.isWeb3 ? "const Web3 = require('web3');\nconst web3 = new Web3();" : ''}
// `;

//         await fs.writeFile(path.join(projectPath, 'index.js'), indexJsContent.trim());

//         console.log(`Project ${projectName} created successfully at ${projectPath}`);
//     } catch (err) {
//         console.error('Error creating project:', err);
//     }
// };

// // 명령어의 인자를 가져옵니다.
// const [, , projectName] = process.argv;

// if (!projectName) {
//     console.error('Please specify a project name.');
//     process.exit(1);
// }

// createProject(projectName);