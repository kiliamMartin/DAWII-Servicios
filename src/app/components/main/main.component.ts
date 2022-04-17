import { Component, OnInit } from '@angular/core';
import { findIndex } from 'rxjs';
import { ApiService, GasStations, ListaEESSPrecio } from 'src/app/services/api.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  GasList : ListaEESSPrecio[] = []

  constructor(private api: ApiService) {
   
   }

  ngOnInit(): void {
    this.api.fetchGasStation().subscribe(result => {
     
      this.GasList = this.filterGranCanariaOnly(result.ListaEESSPrecio)
      this.addLogoToGS()
    })
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
