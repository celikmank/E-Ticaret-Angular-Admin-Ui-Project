import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { UserModel } from "@e-ticaret/shared/models/User-model";
import { cartModel } from "@e-ticaret/shared/models/cart.model"; // Modelini import et

@Injectable({
    providedIn: 'root'
})
export class Common {
    readonly user = signal<UserModel | undefined>(undefined);
    readonly cartCount = signal<number>(0);

    readonly #http = inject(HttpClient);

    constructor() {
        const response: string | null = localStorage.getItem("response");
        if (response) {
            this.user.set(JSON.parse(response));
        }
        // Sepet sayısını çek
        this.getCartCount();
    }

    getCartCount() {
        if (this.user()) {
            const endpoint = `api/carts?userId=${this.user()!.id}`;
            this.#http.get<cartModel[]>(endpoint).subscribe((res) => {
                this.cartCount.set(res.length);
            });
        }
    }
}