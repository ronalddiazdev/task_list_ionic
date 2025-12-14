import { inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private alertController: AlertController = inject(AlertController);

  public async showMessage(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public async showMessageConfirm(
    header: string,
    message: string,
    funcionOk: Function,
    cancelText: string = 'Cancelar',
    confirmnText: string = 'Aceptar'
  ) {

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: cancelText,
        role: 'cancel',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: confirmnText,
        role: 'Confirmar',
        handler: () => {
          funcionOk();
        },
      },],
    });

    await alert.present();

  }
}
