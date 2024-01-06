import { Component } from '@angular/core';
import { ShoppingItemsService } from '../services/shopping-items.service';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  message: string = 'prueba';

  constructor(
    public shoppingService: ShoppingItemsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController
  ) {
  }

  async removeItem(item: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta!!',
      subHeader: `Estas a punto de eliminar ${item}`,
      message: 'Esta acción no podra revertirse',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss()
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.shoppingService.removeItem(item);
          }
        }
      ],
    });

    await alert.present();
  }

  onReorderItems(event) {
    const item = this.shoppingService.items.splice(event.detail.from, 1)[0];
    this.shoppingService.items.splice(event.detail.to, 0, item);
    event.detail.complete();
  }

  async removeAllItems() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta!!',
      subHeader: `Estas a punto de eliminar todos los elementos`,
      message: 'Esta acción no podra revertirse',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss()
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.shoppingService.removeAllItems();
            this.menuCtrl.close();
          }
        }
      ],
    });

    await alert.present();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddItemComponent,
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'confirmar'){
      this.message = `Hello, ${data}`;
    }
  }

}
