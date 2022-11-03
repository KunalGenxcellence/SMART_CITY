import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'sb-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {
userId:any;
categoryId:any;
stockDetails=[];
data1:any
  constructor(private route: ActivatedRoute, private indentService: IndentService,  private spinner: NgxSpinnerService,) {}

    ngOnInit() {
    this.route.params
          .subscribe(
            (params: Params) => {
              this.userId= params['userId'];
              this.categoryId= params['categoryId'];
              this. getdetails(params['userId'], params['categoryId'] ); 
              console.log(this.categoryId,this.userId);
            }
          );
        }


        getdetails(UserID:any, CategoryID:any,)
        {
          let data={
            UserID:UserID,
            CategoryID:CategoryID
          }
          this.spinner.show();
         this.indentService.getalluserstocksummery(data).subscribe(res=>{
     
         this.stockDetails = res.data;
         this.stockDetails.forEach(element => {
        this.data1=element['stock'];
        console.log(this.data1)
        this.spinner.hide();
       });
        
           }, error=>
           {

           }
           )
        }
    }
