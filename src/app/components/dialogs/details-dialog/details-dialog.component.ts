import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
                                                    logo:string,
                                                    name:string,
                                                    address:string,
                                                    town:string,
                                                    schedule:string,
                                                    priceGas95:string, 
                                                    priceGas98:string,
                                                    priceDiesel:string
                                                  }){}

  ngOnInit(): void {
  }

}
