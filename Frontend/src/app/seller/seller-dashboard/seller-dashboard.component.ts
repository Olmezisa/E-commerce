import { Component, OnInit } from '@angular/core';
import { SellerDashboardDto, SellerService } from '../../core/services/seller.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: false,
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit{
  data: SellerDashboardDto = { totalProducts: 0, totalOrders: 0, pendingOrders: 0, totalRevenue: 0 };
  loading = true;
  error = '';

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.getDashboard().subscribe({
      next: dto => {
        this.data = dto;
        this.loading = false;
      },
      error: err => {
        console.error('Dashboard load error', err);
        this.error = 'Dashboard yüklenirken hata oluştu';
        this.loading = false;
      }
    });
  }

}
