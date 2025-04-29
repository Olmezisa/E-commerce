// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../ProductModule/models/product.model';
import { ProductService } from '../../ProductModule/services/product.service';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

}
