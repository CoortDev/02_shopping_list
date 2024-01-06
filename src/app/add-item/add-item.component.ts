import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShoppingItemsService } from '../services/shopping-items.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent   {

  item: string;

  constructor(
    private modalCtrl: ModalController,
    private shoppingService: ShoppingItemsService
  ) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancelar');
  }

  confirm() {
    if (!this.shoppingService.existsItem(this.item)) {
      this.shoppingService.addItem(this.item);
      this.item = '';
    }
    else {
      this.shoppingService.alertError('Precaución!', '', 'El articulo ingresado ya existe!');
    }
    return this.modalCtrl.dismiss(null, 'guardar');
  }

}
