import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-add-receiving',
  templateUrl: './add-receiving.component.html',
  styleUrls: ['./add-receiving.component.scss']
})
export class AddReceivingComponent implements OnInit {

  indentInfo : FormGroup;

  constructor(private formBuilder : FormBuilder,private toastr: ToastrService){
    this.indentInfo = this.formBuilder.group({
      files:[],
      remarks : [],
      items : this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.setDefaultData();
  }

  addItem(){
    if(this.indentInfo.invalid){
      this.showError();
      return this.indentInfo
    }
    let items = this.indentInfo.get('items') as FormArray;
    items.push(this.formBuilder.group({
      category : ['', [Validators.required]],
      itemName : ['', [Validators.required]],
      quantity:['', [Validators.required]],
      unit:['', [Validators.required]],
    }));
  }

  defaultData(){
    let items = this.indentInfo.get('items') as FormArray;
    items.push(this.formBuilder.group({
      category : ['', [Validators.required]],
      itemName : ['', [Validators.required]],
      quantity:['', [Validators.required]],
      unit:['', [Validators.required]],
    }));
  }

  // createCustomerInfo(){
  //   console.log('data is ', this.customerInfo.value);
  //   this.customerInfo.markAllAsTouched();
  // }

  setDefaultData(){
    this.defaultData();
  }

  hideItem(index : any){
    let item = this.indentInfo.get('items') as FormArray;
    item.removeAt(index);
  }

  showError(){
    this.toastr.error('Fields Should not be empty !', '', {
      timeOut: 3000,
    });
  }
}
