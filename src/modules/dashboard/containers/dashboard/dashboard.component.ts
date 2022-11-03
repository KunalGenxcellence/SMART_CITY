import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserdetailsService } from '@modules/dashboard/services/userdetails.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sb-dashboard',
    //changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    allUserdetails: any;
    constructor(private userdetails: UserdetailsService, private toaster:ToastrService) { }
    ngOnInit() { 
        this.getUserDetails();
    }


    getUserDetails() {
        this.userdetails.getAllUserDetails().subscribe(res => {
         this.allUserdetails=res;
         this.toaster.success(res.message);

        },
        error=>{
            this.toaster.error(error.error.message);
        });
        
    }
}
