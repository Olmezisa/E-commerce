import { Component, ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-navbar',
  standalone:false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isClickedNavbar = false;



  categories = [
    { label: 'Top Offers', icon: 'star' },
    { label: 'Grocery', icon: 'local_grocery_store' },
    { label: 'Mobiles', icon: 'smartphone' },
    { label: 'Home', icon: 'weekend' },
    { label: 'Electronics', icon: 'devices_other' },
    { label: 'Fashion', icon: 'checkroom' },
    { label: 'Beauty & Accessories', icon: 'brush' },
  ];

  constructor(private el: ElementRef) {}

  isClicked() {
    this.isClickedNavbar = !this.isClickedNavbar;
  }

  onCategory(cat: { label: string; icon: string }) {
    console.log('Seçilen kategori:', cat.label);
    this.isClickedNavbar = false;
  }

  // Sayfanın herhangi bir yerine tıklandığında...
  @HostListener('document:click', ['$event.target'])
  handleOutsideClick(target: HTMLElement) {
    // Eğer tıklanan element bizdeki buton/menü kapsayıcısının dışında ise
    if (this.isClickedNavbar && !this.el.nativeElement.contains(target)) {
      this.isClickedNavbar = false;
    }
  }
}
