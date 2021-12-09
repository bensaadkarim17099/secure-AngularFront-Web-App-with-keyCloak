import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../services/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers: any;

  constructor(private suppliersService:SuppliersService) { }

  ngOnInit(){

    this.suppliersService.getSupplier().subscribe(data=>{
      this.suppliers=data;
    },
    err=>{
      console.log(err);
      
    })
  }

}
