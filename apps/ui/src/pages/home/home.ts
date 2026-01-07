import { HttpClient, httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, signal, untracked, ViewEncapsulation } from '@angular/core';
import { ProductModel } from '@e-ticaret/shared/models/product.model';
import { TrCurrencyPipe } from 'tr-currency';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../../services/common';
import { cartModel } from '@e-ticaret/shared/models/cart.model';
import { FlexiToastService } from 'flexi-toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrCurrencyPipe, InfiniteScrollDirective],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {
  readonly placeholderCount = signal<number[]>([1, 2, 3, 4, 5, 6]);
  readonly categoryUrl = signal<string | undefined>(undefined);
  readonly categoryUrlPrev = this.computedPrevious(this.categoryUrl);
  readonly limit = signal<number>(6);
  readonly start = signal<number>(0);

  readonly result = httpResource<ProductModel[]>(() => {
    let endpoint = 'api/products?';
    if (this.categoryUrl()) {
      endpoint += `categoryUrl=${this.categoryUrl()}&`;
    }
    endpoint += `_limit=${this.limit()}&_start=${this.start()}`;
    return endpoint;
  });

  readonly data = computed(() => this.result.value() ?? []);
  readonly loading = computed(() => this.result.isLoading());
  readonly dataSignal = signal<ProductModel[]>([]);
  readonly user = computed(() => this.#common.user());

  readonly #http = inject(HttpClient);
  readonly #activated = inject(ActivatedRoute);
  readonly #common = inject(Common);
  readonly #toast = inject(FlexiToastService);

  constructor() {
    this.#activated.params.subscribe((res) => {
      this.categoryUrl.set(res['categoryUrl'] || undefined);
    });

    effect(() => {
      const freshData = this.data();
      // Kategori değişmişse listeyi temizle ve yeni veriyi set et
      if (this.categoryUrlPrev() !== this.categoryUrl()) {
        untracked(() => {
          this.start.set(0);
          this.dataSignal.set([...freshData]);
        });
      } else {
        // Aynı kategoride scroll yapılmışsa duplicate kontrolü yaparak ekle
        this.dataSignal.update((prev) => {
          const newItems = freshData.filter(f => !prev.some(p => p.id === f.id));
          return [...prev, ...newItems];
        });
      }
    });
  }

  onScroll() {
    // Yükleme devam ediyorsa veya veri kalmadıysa yeni istek atma
    if (this.loading()) return;
    
    // Her scroll'da start değerini limit kadar artır
    this.start.update((prev) => prev + 6);
  }

  addToCart(data: ProductModel) {
    const currentUser = this.user();
    console.log('Current User:', currentUser);
    
    if (!currentUser || !currentUser.id) {
      this.#toast.showToast("Hata", "Sepete eklemek için giriş yapmalısınız", "error");
      return;
    }

    const cart: cartModel = {
      id: Math.random().toString(36).substring(2, 6),
      userId: currentUser.id,
      productId: data.id || '',
      productName: data.name,
      price: data.price,
      quantity: 1
    };

    console.log('Sepete eklenecek ürün:', cart);

    this.#http.post("api/carts", cart).subscribe({
      next: (response) => {
        console.log('Sepete ekleme başarılı:', response);
        this.#toast.showToast("Başarılı", "Ürün sepete başarıyla eklendi");
        this.#common.cartCount.update(prev => prev + 1);
      },
      error: (err) => {
        console.error('Sepete ekleme hatası detay:', {
          error: err,
          status: err.status,
          message: err.message,
          url: err.url
        });
        this.#toast.showToast("Hata", "Ürün eklenirken bir sorun oluştu", "error");
      }
    });
  }

  computedPrevious<T>(s: Signal<T>): Signal<T> {
    let previous = untracked(() => s());
    return computed(() => {
      const current = s();
      const res = previous;
      previous = current;
      return res;
    });
  }
}