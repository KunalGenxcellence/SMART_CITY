import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { SBSortableHeaderDirective, SortEvent } from '@modules/tables/directives';
import { Country } from '@modules/tables/models';
import { CountryService } from '@modules/tables/services';
import { NgbPaginationNumber, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'sb-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss']
})
export class ViewStockComponent implements OnInit {

  pageSize = 5;
  currentPage = 1;
  stockListResponse: any;
  indentList: any = [];
  total: number = 0;
  orderTypeId: number = 3;
  isLoading = false;
  closeModal: string = "";
  stockItemList: any;
  indentObj: any;
  stockOrderTypeId: number = 1;
  verifiedInddentList: any;
  isApproveAccess: Boolean = true;
  searchText = '';
  selectElement:any;
  categories = [{name:'Plants',id:'1'},{name:'Equipment',id:'2'},{name:'Chemicals',id:'3'},{name:'Civil Item',id:'4'}];
  itemList = [];
  ItemDropdown :any=[];
  constructor(
    private indentService: IndentService, private changeDetectorRef: ChangeDetectorRef, private modalService: NgbModal, private toaster: ToastrService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.isLoading = true;
    //this.changeDetectorRef.detectChanges();
    this.spinner.show();
    this.getStock(this.currentPage, this.pageSize);

  }

  getStock(page: any, pageSize: any) {
    let getStockObj = { ordertype_id: this.orderTypeId, page_no: page, record_limit: pageSize, search_text: this.searchText };
    this.indentService.getAllStock(getStockObj).subscribe(response => {
      this.stockListResponse = response.data;
      //console.log(this.stockListResponse)
      this.total = this.stockListResponse['total_no_of_records'];
      this.isLoading = false;
      this.spinner.hide();
      //this.changeDetectorRef.detectChanges();
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.spinner.hide();
      //this.changeDetectorRef.detectChanges();
    })
  }


  nextPage(page: number) {
    // console.log(page);
    this.currentPage = page;
    this.isLoading = true;
    this.stockItemList = null;
    //this.changeDetectorRef.detectChanges();
    this.spinner.show();
    // this.getStockItems()
  }

  pageSizeChanged() {
    this.isLoading = true;
    this.stockItemList= null;
    //this.changeDetectorRef.detectChanges();
   this.spinner.show();
    // this.getStockItems()
  }
  approveItem() {
    let user_details = JSON.parse(localStorage.getItem("user_details") || '{}');
    if (user_details.name === "HO") {
      this.isApproveAccess = false;
    }

  }

  getStockItems() {
    let userDetails = JSON.parse(localStorage.getItem("user_details") || '{}');
    let output:any; 
    this.selectElement = document.getElementById('category');
    output = this.selectElement.options[this.selectElement.selectedIndex].text
    // console.log(output);
    let categoryId:any
    this.categories.forEach(element=>{
        if(element.name==output){
          categoryId=element.id
        }
      });
    let stockItem = {
      UserID: userDetails.user_id,
      CategoryID: categoryId,
    };
    this.spinner.show();
    this.indentService.stockItemList(stockItem).subscribe(response => {
      this.stockItemList = response;
      this.isLoading = false;
      this.spinner.hide();
      this.toaster.success(response.message);
    }, error => {
      this.spinner.hide();
      this.toaster.error(error.error.message);
      this.isLoading = false;
    })
    this.approveItem();
  }

  onCategoryChange(event:any,index:any){
    this.ItemDropdown[index] = this.itemList.filter((item,i)=>{
      return item['category'] == event;
    })
   
  }
  
  
  onSort({ column, direction }: SortEvent) {
    // this.sortedColumn = column;
    // this.sortedDirection = direction;
    // this.countryService.sortColumn = column;
    // this.countryService.sortDirection = direction;
    // //this.changeDetectorRef.detectChanges();
  }
  
 
}
