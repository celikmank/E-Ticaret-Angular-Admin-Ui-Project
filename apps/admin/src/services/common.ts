import { Injectable, signal } from '@angular/core';
import { BreadcrumbModel } from '@e-ticaret/shared/models/Breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class Common {
  readonly data = signal<BreadcrumbModel[]>([]);

  set(incomingData: BreadcrumbModel[]) {
    const val: BreadcrumbModel = {
      title: 'Ana Sayfa',
      url: '/',
      icon: 'home',
    };


    this.data.set([val, ...incomingData]);
    
    console.log("Breadcrumb güncellendi:", this.data());
  }
}