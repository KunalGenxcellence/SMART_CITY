import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-verify-indent',
  templateUrl: './verify-indent.component.html',
  styleUrls: ['./verify-indent.component.scss']
})
export class VerifyIndentComponent implements OnInit {

  pageSize = 5;
  currentPage = 1;
  indentListResponse: any;
  indentList:any=[];
  total: number = 0;
  orderTypeId: number = 1;
  isLoading = false;

  constructor(
    private indentService:IndentService,private changeDetectorRef: ChangeDetectorRef
) {}

ngOnInit() {
  this.isLoading = true;
  //this.changeDetectorRef.detectChanges();
  this.getIndents(this.currentPage,this.pageSize);
}

getIndents(page:any,pageSize:any){
  let getIndentObj = {ordertype_id:this.orderTypeId,page_no:page,record_limit:pageSize};
  this.indentService.getIndent(getIndentObj).subscribe(response=>{
      this.indentListResponse = response;
      this.total = this.indentListResponse['total_no_of_records'];
      this.isLoading = false;
      //this.changeDetectorRef.detectChanges();
  },error =>{
    console.log(error);
    this.isLoading = false;
      //this.changeDetectorRef.detectChanges();
  })
}

onSort({ column, direction }: SortEvent) {
  // this.sortedColumn = column;
  // this.sortedDirection = direction;
  // this.countryService.sortColumn = column;
  // this.countryService.sortDirection = direction;
  // //this.changeDetectorRef.detectChanges();
}

nextPage(page:number){
  console.log(page);
  this.currentPage = page;
  this.isLoading = true;
  this.indentListResponse = null;
  //this.changeDetectorRef.detectChanges();
  this.getIndents(this.currentPage,this.pageSize);
}

pageSizeChanged(){
  this.isLoading = true;
  this.indentListResponse = null;
  //this.changeDetectorRef.detectChanges();
  this.getIndents(this.currentPage,this.pageSize);
}

}
