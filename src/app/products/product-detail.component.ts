import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Detalles del Producto';
  product: IProduct;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
              }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(
        product => this.product = product,
    );
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
