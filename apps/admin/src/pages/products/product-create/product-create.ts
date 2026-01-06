import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from "@angular/core";
import Blank from "../../../components/blank";
import { FlexiGridModule } from "flexi-grid";
import { FormsModule, NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FlexiToastService } from "flexi-toast";
import { NgxMaskDirective } from 'ngx-mask';

@Component({
    standalone: true,
    imports: [Blank, FlexiGridModule, FormsModule, NgxMaskDirective],
    selector: 'app-product-create',
    templateUrl: './product-create.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export default class ProductCreate {

    readonly #http = inject(HttpClient);
    readonly #router = inject(Router);
   // readonly #location = inject(Location);
   readonly #toast=inject(FlexiToastService);

    save(form: NgForm) {
        this.#toast.showToast('Başarılı','Ürün başarıyla eklendi.','success');
        if (!form.valid) return;

        this.#http.post("http://localhost:3000/products", form.value).subscribe(() => {
            this.#router.navigate(['/products']);
        });
    }
}