import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from "@angular/core";
import Blank from "../../components/blank";
import { FlexiGridFilterDataModel, FlexiGridModule } from "flexi-grid";
import { ProductModel } from "../../models/Product.model";
import { httpResource } from "@angular/common/http";
import { RouterLink } from "@angular/router";
import { FlexiToastService } from "flexi-toast";



@Component({
    selector: 'app-products',

    imports: [Blank, FlexiGridModule, RouterLink],
    templateUrl: './products.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export default class Products {
    readonly result = httpResource<ProductModel[]>(() => "http://localhost:3000/products");
    readonly data = computed(() => this.result.value() ?? []);
    readonly loading = computed(() => this.result.isLoading());

    readonly categoryFilter = signal<FlexiGridFilterDataModel[]>([]);

    readonly #toast=inject(FlexiToastService);

    delete(id:string) {
        this.#toast.showSwal('Ürünü Sil? ','Ürünü Silmek İstiyor Musunuz?','Sil',() => {
            this.result.reload();
        });
    }
}