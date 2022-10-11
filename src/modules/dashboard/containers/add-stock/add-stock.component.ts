import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  stockInfo: FormGroup;
  indentOrderTypeId: number = 3;
  isLoading: boolean = false;
  categories = [{ name: 'Plants', id: '1' }, { name: 'Equipment', id: '2' }, { name: 'Chemicals', id: '3' }, { name: 'Civil Item', id: '4' }];
  itemList = [{ name: 'Rose', id: '1', category: 1 }, { name: 'Marigold', id: '2', category: 1 }, { name: 'Lily', id: '3', category: 1 },
  { name: 'Broom', id: '4', category: 2 }, { name: 'Plough', id: '5', category: 2 }, { name: 'Bagud', id: '6', category: 2 },
  { name: 'Fertilizer', id: '7', category: 3 }, { name: 'Pesticides', id: '8', category: 3 },
  { name: 'Cement', id: '9', category: 4 }, { name: 'Bricks', id: '10', category: 4 }, { name: 'Gravel', id: '11', category: 4 }];
  ItemDropdown: any = [];

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private indentService: IndentService, private router: Router,
    private spinner: NgxSpinnerService) {
    this.stockInfo = this.formBuilder.group({
      files: [],
      remarks: ['', [Validators.required]],
      items: this.formBuilder.array([])
    })
  }


  ngOnInit(): void {
    this.isLoading = false;
    this.setDefaultData();

  }

  addItem() {
    let items = this.stockInfo.get('items') as FormArray;
    if (items.invalid) {
      this.showError();
      return this.stockInfo
    }
    items.push(this.formBuilder.group({
      category: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    }));
  }

  onCategoryChange(event: any, index: any) {
    this.ItemDropdown[index] = this.itemList.filter((item, i) => {
      return item['category'] == event;
    })
  }

  defaultData() {
    let items = this.stockInfo.get('items') as FormArray;
    items.push(this.formBuilder.group({
      category: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    }));
  }

  setDefaultData() {
    this.defaultData();
  }

  hideItem(index: any) {
    let item = this.stockInfo.get('items') as FormArray;
    item.removeAt(index);
  }

  showError() {
    this.toastr.error('Fields Should not be empty !', '', {
      timeOut: 3000,
    });
  }

  addStock() {
    if (!this.stockInfo.valid) {
      this.showError();
      return this.stockInfo
    }
    let stockData = this.stockInfo.value;
    stockData['ordertype_id'] = this.indentOrderTypeId;
    stockData['created_by'] = 1;
    this.isLoading = true;
    this.spinner.show();
    this.indentService.saveIndent(stockData).subscribe(response => {
      this.toastr.success('Stock Created Succesfully.', '', {
        timeOut: 3000,
      });
      this.spinner.hide();
      this.router.navigate(['dashboard/viewStock'])

    },
      error => {
        this.isLoading = true;
        console.log(error);
        this.spinner.hide();
        if (error.error) {
          console.log(error.message);
          this.toastr.error(error.message, '', {
            timeOut: 3000,
          });
        }
      });
  }

}
