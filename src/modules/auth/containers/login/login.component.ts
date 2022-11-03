import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'sb-login',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {

    loginInfo: FormGroup;

    constructor(private formBuilder: FormBuilder, private router: Router, private toastService: ToastrService,
        private authService: AuthService, private spinner: NgxSpinnerService) {
        this.loginInfo = this.formBuilder.group({
            name: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    ngOnInit() {
    }

    login() {
        if (this.loginInfo.invalid) {
            this.toastService.error('Please enter required fields', 'Error')
            return;
        }
        this.spinner.show();
        let data = this.loginInfo.value;
        let apiBody = {
            username: data.name,
            password: data.password
        }
        this.authService.login(apiBody).subscribe(res => {
            console.log(res.user_details);
            this.spinner.hide();
            localStorage.setItem('user_details', JSON.stringify(res.user_details));
            this.toastService.success(res.message);
            this.router.navigate(['/dashboard/dashboard']);
        },
            error => {
                this.spinner.hide();
                this.toastService.error(error.error.message);

            }
        );
    }
}
