import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { NgbPaginationNumber, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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
  closeModal: string = "";
  createIndentList:any;
  indentObj:any;
  indentOrderTypeId :number = 1;
  verifiedInddentList:any;
  isApproveAccess: Boolean = true;
  searchText='';

  // tempIndentData:any;
  constructor(
    private indentService:IndentService,private changeDetectorRef: ChangeDetectorRef,private modalService: NgbModal, private toaster:ToastrService,
    private spinner: NgxSpinnerService)
     {

     }

ngOnInit() {
  this.isLoading = true;
  //this.changeDetectorRef.detectChanges();
  this.spinner.show();
  this.getIndents(this.currentPage,this.pageSize);
}

getIndents(page:any,pageSize:any){
  let getIndentObj = {ordertype_id:this.orderTypeId,page_no:page,record_limit:pageSize,search_text:this.searchText};
  this.indentService.getIndent(getIndentObj).subscribe(response=>{
      this.indentListResponse = response;
      this.total = this.indentListResponse['total_no_of_records'];
      this.isLoading = false;
      this.spinner.hide();
      //this.changeDetectorRef.detectChanges();
  },error =>{
    console.log(error);
    this.isLoading = false;
    this.spinner.hide();
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
  this.spinner.show();
  this.getIndents(this.currentPage,this.pageSize);
}

pageSizeChanged(){
  this.isLoading = true;
  this.indentListResponse = null;
  //this.changeDetectorRef.detectChanges();
  this.spinner.show();
  this.getIndents(this.currentPage,this.pageSize);
}

private getDismissReason(reason: any): string {
  if (reason === 1) {
    return 'by pressing ESC';
  } else if (reason === 0) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

triggerConfirmationModal(content: any) {
  this.modalService.open(content, {size: 'lg',ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}
ConfirmationModal(content: any) {
  this.modalService.open(content, {size: 'md',ariaLabelledBy: 'modal-basic-title',centered: true}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}

approveItem(){
  let user_details = JSON.parse(localStorage.getItem("user_details") || '{}');
  if(user_details.name === "HO"){
    this.isApproveAccess = false;
  }
  
}

searchIndent(){
  if(this.searchText.length == 16){
    this.spinner.show();
    this.getIndents(this.currentPage,this.pageSize);
  }
  if(this.searchText.length == 0){
    this.spinner.show();
    this.getIndents(this.currentPage,this.pageSize);
  }
}

getIndentLineItems( OrderID : any,content: any,indentObj:any){
  let createIndent = {
    order_id :  OrderID,
    page_no : '1',
    record_limit : '10'
   };

   this.indentObj = indentObj;
   this.spinner.show();
  this.indentService.getAllIndentItem(createIndent).subscribe(response=>{
    this.createIndentList = response;
    this.isLoading = false;
    this.spinner.hide();
    // this.tempIndentData=JSON.stringify(this.createIndentList);
    this.triggerConfirmationModal(content);

  },error =>{
 
    console.log(error);
    this.isLoading = false;
  })
  this.approveItem();
}

checkboxChange(value : any, object : any){
  if(value.target.checked){
    object.item_status = 5;
  }
  else{
    object.item_status = 4;
  }
}

getcheckedVerified(data : any)
{
  this.spinner.show();
let verifyIndentItem={ordertype_id:this.indentOrderTypeId, data:data};
this.indentService.verifyIndentItem(verifyIndentItem).subscribe(response=>{
  this.verifiedInddentList = response;
  this.isLoading = false;
  this.toaster.success(this.verifiedInddentList.message)
  this.modalService.dismissAll();
  this.getIndents(this.currentPage,this.pageSize);
},error =>{
  console.log(error);
  this.isLoading = false;
  this.spinner.hide();
  this.getIndents(this.currentPage,this.pageSize);
})
}

// get disableindent() {
//   return JSON.stringify(this.createIndentList) == this.tempIndentData; 
// }



}
