import fs from 'fs';
import readlineSync from 'readline-sync';
const path = './employees.json';

function readEmployeeData() {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    } else {
        return [];
    }
}

function writeEmployeeData(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

function addOrUpdateEmployee(id, name, salary) {
    const employees = readEmployeeData();
    
    const index = employees.findIndex(emp => emp.id === id);
    
    if (index >= 0) {
        employees[index] = { id, name, salary };
    } else {

        employees.push({ id, name, salary });
    }
    writeEmployeeData(employees);
}

function printAllEmployees() {
    const employees = readEmployeeData();
    console.log("Employee Details:");
    employees.forEach(emp => {
        console.log(`ID: ${emp.id}, Name: ${emp.name}, Salary: ${emp.salary}`);

    });
}

function promptUser() {
    const id = readlineSync.question('Enter Employee ID: ');
    const name = readlineSync.question('Enter Employee Name: ');
    const salaryNumber = readlineSync.questionFloat('Enter Employee Salary: ');

    if (isNaN(salaryNumber)) {
        console.log('Salary must be a number.');
        return;
    }

    addOrUpdateEmployee(id, name, salaryNumber);
    printAllEmployees();
}

promptUser();