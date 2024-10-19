import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/User';
import Swal from 'sweetalert2';
import { UserService } from '../Service/user.service';
import { Validation } from 'src/app/shared/validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registraion-form',
  templateUrl: './registraion-form.component.html',
  styleUrls: ['./registraion-form.component.css']
})
export class RegistraionFormComponent implements OnInit {

  user : User = {

userName:' ',
userPassword:'',
firstName:'',
lastName:'',
contact:'',
gender:'',
email:'',

  }
  contactNumber: string = '';
    userPassword1?:String;
    email:string='';
    stat?:Boolean;


  constructor( private userService : UserService, private router : Router ){}



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

  onSubmit(): void {
    // cheaking empty field
    if (!this.user.userName || !this.user.userPassword || !this.userPassword1 || !this.user.firstName || !this.user.lastName || !this.contactNumber) {
      Swal.fire('', 'Please fill the Blank Field', 'error');
      return;
    }
    if(this.user.gender === ''){
      Swal.fire('', 'Please Select Your Gender', 'error');
      return;
  }
  
    // Password Cheaking
    if (this.user.userPassword !== this.userPassword1) {
      Swal.fire('', 'Passwords do not match. Please enter the same password.', 'error');
      return;
    }
    if(this.email === ''){
      Swal.fire('', 'Please Enter Your Email', 'error');
      return;
  }
    
    function validateContactNumber(number: string): boolean {
      // Regular expression to check if the number has exactly 10 digits
      const regex = /^[0-9]{10}$/;
      
      return regex.test(number);
    }
    function containsAtSymbol(input: string): boolean {
      return input.includes('@');
  }

  const x = containsAtSymbol(this.email);
  if(x === true){
    // Example usage
    if (validateContactNumber(this.contactNumber)) {
      this.user.contact = this.contactNumber;
      this.user.email = this.email;
      this.userService.saveUser(this.user).subscribe(
         (response) => {
        this.stat = response.status;
        console.log(this.stat)
        switch(this.stat){
      case true :
        Swal.fire('', 'Successfully User Register', 'success');
        this.router.navigate(['/Login']); 
        break;
          default :
          Swal.fire('', 'This password is Using Someone', 'error');
        }

        },
        err => {
          Swal.fire('', 'Backend error occurred', 'error');
        }
      );   
     } else {
        Swal.fire('', 'Invalid Contact Number', 'error');
      }
  }
else{
  Swal.fire('', 'Invalid Email', 'error');
}
}
}
