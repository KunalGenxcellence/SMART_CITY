import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdetailsService } from '@modules/dashboard/services/userdetails.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-dashboard',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    allUserdetails: any;
    constructor(private userdetails: UserdetailsService, private toaster:ToastrService, private spinner: NgxSpinnerService, private router:Router) { }
    ngOnInit() { 
        this.getUserDetails();
    }


    getUserDetails() {
        this.spinner.show();
        this.userdetails.getAllUserDetails().subscribe(res => {
         this.allUserdetails=res.data;
         console.log('userdetails',this.allUserdetails)
        //  this.toaster.success(res.message);
        this.spinner.hide();

        },
        error=>{
            this.spinner.hide();
            this.toaster.error(error.error.message);
        });   
    }


    viewStockDetails(data:any)
    {
        this.router.navigate(['dashboard/stockDetails/'+data.UserID+'/'+data.CategoryID])
    }
}
