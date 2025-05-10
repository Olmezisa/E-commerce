import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';  // ActivatedRoute import ediyoruz
import { Review } from '../models/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../core/services/review.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: false,
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  product!: Product;
  loading: boolean = true;

  reviews: Review[] = [];
  reviewForm!: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  this.authService.getCurrentUser().subscribe({
    next: (user) => {
      this.isLoggedIn = !!user;
    },
    error: () => {
      this.isLoggedIn = false;
    }
  });

  this.reviewForm = this.fb.group({
    rating: [5, Validators.required],
    comment: ['', Validators.required]
  });

  const productId = this.route.snapshot.paramMap.get('id');
  if (productId) {
    this.productService.getProductById(Number(productId)).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.loading = false;
        this.loadReviews();
      },
      error: () => {
        this.loading = false;
        console.error('Ürün verisi alınırken hata oluştu.');
      }
    });
  }
}

  loadReviews(): void {
    if (this.product?.id) {
      this.reviewService.getReviews(this.product.id).subscribe({
        next: (res) => {
          this.reviews = res;
        },
        error: () => {
          console.error('Yorumlar alınırken hata oluştu.');
        }
      });
    }
  }

  submitReview(): void {
    if (this.reviewForm.invalid) return;

    this.reviewService.postReview(this.product.id, this.reviewForm.value).subscribe({
      next: () => {
        this.reviewForm.reset({ rating: 5, comment: '' });
        this.loadReviews();
      },
      error: () => {
        console.error('Yorum gönderilirken hata oluştu.');
      }
    });
  }
}
