
import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Common } from '../../services/common';
import { cartModel } from '@e-ticaret/shared/models/cart.model';
import { TrCurrencyPipe } from 'tr-currency';
import { OrderModel, initialOrder } from '@e-ticaret/shared/models/Order-model';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { FlexiSelectModule } from 'flexi-select';

@Component({
  imports: [
    RouterLink,
    TrCurrencyPipe,
    FormsModule,
    DatePipe,
    NgxMaskDirective,
    FlexiSelectModule
  ],
  templateUrl: './payment.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Payment {
  readonly result = httpResource<cartModel[]>(() => `api/carts?userId=${this.#common.user()!.id}`);
  readonly baskets = computed(() => this.result.value() ?? []);
  readonly total = computed(() => {
    let val = 0;
    this.baskets().forEach(res => {
      val+= res.productPrice * res.quantity
    });

    return val;
  });
  readonly kdv = computed(() => this.total() * 18 / 100);
  readonly data = signal<OrderModel>({...initialOrder});
  readonly showSuccessPart = signal<boolean>(false);
  readonly term = signal<boolean>(false);
  readonly cityResult = httpResource<any[]>(() => "/il-ilce.json");
  readonly cities = computed(() => this.cityResult.value() ?? []);
  readonly districts = signal<any[]>([]);

  readonly #common = inject(Common);
  readonly #http = inject(HttpClient);

  pay(form: NgForm){
    if(!form.valid) return;

    this.data.update(prev => ({
      ...prev,
      userId: this.#common.user()!.id!,
      orderNumber: `TS-${new Date().getFullYear()}-${new Date().getTime()}`,
      date: new Date(),
      baskets: [...this.baskets()]
    }));

    this.#http.post("api/orders", this.data()).subscribe(res => {
      this.showSuccessPart.set(true);
      this.baskets().forEach(val => {
        this.#http.delete(`api/carts/${val.id}`).subscribe();
      })
      this.#common.cartCount.set(0);
    });
  }

  setDistricts(){
    const city = this.cities().find(p => p.il_adi === this.data().city);
    this.districts.set(city.ilceler);
  }
}