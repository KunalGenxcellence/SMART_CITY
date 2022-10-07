import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { Observable } from 'rxjs';
import { NgbPaginationNumber, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-view-reciving',
  templateUrl: './view-reciving.component.html',
  styleUrls: ['./view-reciving.component.scss']
})
export class ViewRecivingComponent implements OnInit {

  pageSize = 5;
  currentPage = 1;
  indentListResponse: any;
  indentList:any=[];
  total: number = 0;
  orderTypeId: number = 2;
  isLoading = false;
  closeModal: String = ""
  createIndentList:any;
  receivingObj:any
  verifiedInddentList:any;
  indentOrderTypeId=2
  isApproveAccess: Boolean = true;

  constructor(
    private indentService:IndentService,
    private modalService: NgbModal, private toaster:ToastrService
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

getRecevingItem( OrderID : any,content: any,receivingObj:any){
  let createIndent = {
    order_id :  OrderID
   };
   this.receivingObj = receivingObj;
  this.indentService.getAllIndentItem(createIndent).subscribe(response=>{
    this.createIndentList = response;
    this.isLoading = false;
    this.triggerConfirmationModal(content);
  },error =>{
    console.log(error);
    this.isLoading = false;
  })
  // this.triggerConfirmationModal(content);
  this.approveItem();
}

checkboxChange(value : any, object : any){
  if(value.target.checked){
    object.status = 5;
  }
  else{
    object.status = 4;
  }
}

getcheckedVerified(data:any)
{
  let verifyIndentItem={ordertype_id:this.indentOrderTypeId, data:data};
  this.indentService.verifyIndentItem(verifyIndentItem).subscribe(response=>{
  this.verifiedInddentList = response;
  this.isLoading = false;
  this.toaster.success(this.verifiedInddentList.message)

},error =>{
  console.log(error);
  this.isLoading = false;
})
}


}
