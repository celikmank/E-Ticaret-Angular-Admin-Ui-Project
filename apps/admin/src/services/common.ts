import { Injectable, signal } from '@angular/core';
import { BreadcrumbModel } from '@e-ticaret/shared/models/Breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class Common {
  // Breadcrumb verilerini tutan signal
  readonly data = signal<BreadcrumbModel[]>([]);
  
  // Eğer kullanıcı verisi tutacaksan bunu da tanımlamalısın
  readonly user = signal<any>(null);

  constructor() {
    // Sayfa yenilendiğinde kullanıcıyı hafızadan geri yükle
    const response = localStorage.getItem("response");
    if (response) {
      try {
        this.user.set(JSON.parse(response));
      } catch (e) {
        console.error("Localstorage verisi ayrıştırılamadı", e);
      }
    }
  }

  /**
   * Breadcrumb listesini günceller. 
   * Her zaman en başa 'Ana Sayfa'yı ekler.
   */
  setBreadcrumb(incomingData: BreadcrumbModel[]) {
    const home: BreadcrumbModel = {
      title: 'Ana Sayfa',
      url: '/',
      icon: 'home',
    };

    // Mevcut gelen verinin başına Ana Sayfa'yı ekleyip güncelle
    this.data.set([home, ...incomingData]);
    
    console.log("Breadcrumb güncellendi:", this.data());
  }
}