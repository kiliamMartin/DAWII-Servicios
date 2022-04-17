import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { findIndex } from 'rxjs';
import { ApiService, GasStations, ListaEESSPrecio } from 'src/app/services/api.service';
import { DetailsDialogComponent } from '../dialogs/details-dialog/details-dialog.component';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  
 

  GasList : ListaEESSPrecio[] = []


  constructor(private api: ApiService, private dialog: MatDialog) {
   
   }

  ngOnInit(): void {
    this.api.fetchGasStation().subscribe(result => {
     
      this.GasList = this.filterGranCanariaOnly(result.ListaEESSPrecio)
      this.addLogoToGS()
      
    })
  }

  openDetailsDialog(logo:string,name:string,address:string,town:string,schedule:string,priceGas95:string, priceGas98:string,priceDiesel:string) {
    this.dialog.open(DetailsDialogComponent, {
      data: 
      {
        logo:logo,
        name:name,
        address:address,
        town:town,
        schedule:schedule,
        priceGas95:priceGas95, 
        priceGas98:priceGas98,
        priceDiesel:priceDiesel
      },  
      
    });
      
    
  }

  onSearch(event: KeyboardEvent) {
   var filterValue = (event.target as HTMLInputElement).value;
    
    if(filterValue === "") {this.ngOnInit()}
    if(event.key =="Backspace") { }
    this.GasList =this.GasList.filter(gs => gs['Rótulo'].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
    gs.Municipio.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1) 
    console.log(event.key)
   
    
    
  }


  private getLogoPath(logo:string): string{
    switch(logo){
      case "BP":
          return "assets/bp.png"

      case "SHELL":
          return "assets/shell.png"
      
      case "DISA":
          return "assets/disa.png"
     
      case "CEPSA":
          return "assets/cepsa.jpg"
      
      case "REPSOL":
        return "assets/repsol.png"
      
      case "CANARY":
        return "assets/canary.jpeg"

      case "PETROPRIX":
        return "assets/petroprix.jpg"

      case "OCÉANO":
        return "assets/oceano.jpeg"
        
      default:
          return "assets/undefined.png"
    }
  }


  

  private addLogoToGS(){
    const logosArray: string[] = ['BP','CEPSA', 'DISA', 'CANARY', 'SHELL', 'REPSOL', 'PETROPRIX', 'OCÉANO']
    for(let i = 0; i < this.GasList.length; i++){
      this.GasList[i].logo = this.getLogoPath("UNDEFINED")
      var chunked = this.GasList[i]['Rótulo'].split(" ")
      for(let j = 0; j < chunked.length; j++){
        if(logosArray.includes(chunked[j])){
          this.GasList[i].logo = this.getLogoPath(chunked[j])
          break;
        }
      }
    }
    
  }

  private filterGranCanariaOnly(GSList: ListaEESSPrecio[]){
    var GasListFiltered : ListaEESSPrecio[] = []
    const townsArray: string[] = ["Agaete", "Arucas","Agüimes", 
    "Aldea de San Nicolás (La)", "Artenara", "Firgas","Gáldar","Ingenio","Mogán","Moya",
    "Palmas de Gran Canaria (Las)","San Bartolomé de Tirajana","Santa Brígida", "Santa Lucía de Tirajana", 
    "Santa María de Guía de Gran Canaria","Tejeda", "Telde","Teror", "Valleseco", "Valsequillo de Gran Canaria", 
    "Vega de San Mateo"]
    for(let i = 0; i < GSList.length; i++){
        if(townsArray.includes(GSList[i].Municipio)){
          GasListFiltered.push(GSList[i])
        }
    }
    return GasListFiltered;

  }


  

}
