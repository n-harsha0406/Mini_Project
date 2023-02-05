
import { createReadStream } from 'fs';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import csvParser from 'csv-parser';


function signup() {
  const name = prompt("Name:");
  const area = prompt("Area:");
  const phoneNum = prompt("Phone Number:");
  let password = prompt("Password:");
  let conPassword = prompt("Confirm Password:");

  while (password !== conPassword) {
    conPassword = prompt("Confirm Password:");
  }

  const rows = [name, area, phoneNum, password, conPassword];

  const infoWriter = createCsvWriter({
    path: 'User_Info.csv',
    header: ['Name', 'Area', 'Phone Number', 'Password', 'Confirm Password']
  });
  infoWriter.writeRecords([{
    Name: name,
    Area: area,
    PhoneNumber: phoneNum,
    Password: password,
    ConfirmPassword: conPassword
  }]);

  const loginWriter = createCsvWriter({
    path: 'Login.csv',
    header: ['Username', 'Password']
  });
  loginWriter.writeRecords([{
    Username: name,
    Password: password
  }]);
}

function main() {
  const username = prompt("Username:");
  createReadStream('Login.csv')
    .pipe(csvParser())
    .on('data', (data) => {
      if (data.Username === username) {
        let password = document.getElementById("inputPassword").value;
        if (data.Password === password) {
          console.log("Login successful");
        } else {
          console.log("Incorrect password");
          alert("Enter the password again:");
          password = document.getElementById("inputPassword").value;
          console.log(password);
          while (data.Password !== password) {
            alert("Enter the password again:");
            password = document.getElementById("inputPassword").value;
            console.log(password);
          }
        }
      }
    })
    .on('end', () => {
      console.log("Your username is not registered");
      console.log("Please sign up");
      signup();
    });
}

document.getElementById("btn").addEventListener("click", main());
