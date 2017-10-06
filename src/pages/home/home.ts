import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Http } from  '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datos = {};
  constructor(public navCtrl: NavController, public barcode: BarcodeScanner, private http: Http) {

  }

  escanear () {
    this.barcode.scan().then((barcodeData) => {
      //console.log (barcodeData.text);
      this.http.get('http://world.openfoodfacts.org/api/v0/product/' + barcodeData.text + '.json').map(res => res.json()).subscribe(data => {
         console.log (data);
         this.datos = data.product.product_name_en;
      });
     }, (err) => {
         // An error occurred
     });
  }

}
