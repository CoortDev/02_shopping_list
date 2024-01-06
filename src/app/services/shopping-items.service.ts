import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemsService {
  items: string[];
  isEmpty: boolean;
  constructor(
    private alertController: AlertController
  ) {
    this.items = [];
    this.isEmpty = true;
  }

  addItem(item: string) {
    this.items.push(item);
    this.isEmpty = false;
  }

  removeItem(item: string) {
    this.items.splice(this.items.findIndex(it => it.toLowerCase().trim() === item.toLowerCase().trim()),1);
    this.isEmpty = this.items.length > 0?false:true;
  }

  removeAllItems() {
    this.items = [];
    this.isEmpty = true;
  }

  existsItem(item: string): boolean {
    return this.items.find(it => it.toLowerCase().trim() === item.toLowerCase().trim())?true:false;
  }

  async alertError(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  
}
