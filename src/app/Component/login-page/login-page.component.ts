import { Component } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
title = 'loginss'
  
backEndMessages ?: String;
  userNameBackend?:String;
  myForm: FormGroup;

  constructor(private userService : UserService, private router : Router){
  this.myForm = new FormGroup ({
  userName: new FormControl(''),
  userPassword : new FormControl ('')
});

  }

  onClick(){
    if (!this.myForm.value.userName && !this.myForm.value.userPassword) {
      Swal.fire('', 'User Name & Password fields are empty!!', 'warning');
    } else if (!this.myForm.value.userName) {
      Swal.fire('', 'User Name field is empty!!', 'warning');
   
    } else if (!this.myForm.value.userPassword) {
      Swal.fire('', 'Password field is empty!!', 'warning');
      
    } else {    

    console.log(this.myForm.value);
    this.userService.getUserUserNameAndUserPassword(this.myForm.value).subscribe(
      (response: string) => {
        this.backEndMessages = response;
        Swal.fire('', response, 'success');
       
       console.log(response)
       switch(response) {
        case " Successfully logged in":

        const sessionData = {
          userName: this.myForm.value.userName
        };
        sessionStorage.setItem('userName', sessionData.userName);

      this.router.navigate(['/Logout']); 

          Swal.fire('', response, 'success');
          break;
      
        case " Incorrect password":
          Swal.fire('', response, 'error');
          break;
      
        case " User name is Incorrect":
          Swal.fire('', response, 'error');
          break;
      
        default:
          Swal.fire('', '"Unable to Logging user"', 'error');
          break;
      }
      },
      err => {

        Swal.fire('', 'Backend error occurred', 'error');

      }
    );
  }
  } 
}
