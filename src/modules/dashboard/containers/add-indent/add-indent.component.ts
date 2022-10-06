import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndentService } from '@modules/dashboard/services/indent.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-add-indent',
  templateUrl: './add-indent.component.html',
  styleUrls: ['./add-indent.component.scss']
})
export class AddIndentComponent implements OnInit {

  indentInfo : FormGroup;
  indentOrderTypeId :number = 1;

  constructor(private formBuilder : FormBuilder,private toastr: ToastrService,private indentService:IndentService, private router:Router){
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
    if(this.indentInfo.invalid ){
      this.showError();
      return this.indentInfo
    }
    let items = this.indentInfo.get('items') as FormArray;
    console.log(items)
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

  addIndent(){
    //console.log('data is ', this.indentInfo.value);
    if(!this.indentInfo.valid){
      return;
    }
    let indentData = this.indentInfo.value;
    indentData['ordertype_id'] = this.indentOrderTypeId;
    indentData['created_by'] = 1;
    this.indentService.saveIndent(indentData).subscribe(response=>{
        this.toastr.success('Indent Created Succesfully.', '', {
          timeOut: 3000,
        });
        this.router.navigate(['dashboard/verifyIndent'])
      
    },
    error =>{
      console.log(error);
      if(error.error){
        console.log(error.message);
        this.toastr.error(error.message, '', {
          timeOut: 3000,
        });
      }
    });
  }


}