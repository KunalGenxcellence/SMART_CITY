import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-login',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginInfo : FormGroup

    constructor(private formBuilder : FormBuilder,private router : Router) {
        this.loginInfo = this.formBuilder.group({
            name: "",
            password: ""
        })
    }

    ngOnInit() {}

    login(){

        let name = this.loginInfo.get('name')?.value;
        if(name !== null && name.toString() === 'HO'){
            let userDetails = {
                name : "HO",
                user_type : "HO"
            }
            window.localStorage.setItem('user_details', JSON.stringify(userDetails));
        }else{
            let userDetails = {
                name : "Zone1",
                user_type : "Daroga"
            }
            window.localStorage.setItem('user_details', JSON.stringify(userDetails));
        }
        this.router.navigate(['/dashboard']);
        
    }

    
    
    

}
