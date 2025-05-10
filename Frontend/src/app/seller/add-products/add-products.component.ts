import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: false,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  productForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private productService:ProductService,
    private router:Router){
      this.productForm=this.fb.group({
        name:['', Validators.required],
        description:[''],
        price: [0,[Validators.required,Validators.min(0)]],
        stock: [0,[Validators.required,Validators.min(0)]],
        imageUrl: ['']
      });
    }

    onSubmit(){
      if(this.productForm.valid){
        this.productService.addProduct(this.productForm.value).subscribe({
          next:() => {
            alert('ürün eklendi!'),
            this.router.navigate(['/seller/seller-dashboard'])
          },
          error: err => {
            console.error('Ürün ekleme hatası', err);
            alert(`Hata! ${err.status} - ${err.message}`);
          }
        });
      }
    }
}
