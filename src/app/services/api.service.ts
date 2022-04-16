import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  gasData : ListaEESSPrecio[] = []
  pepe: any[] = []

  constructor(private http: HttpClient) { 
   
  }

  fetchGasStation(){
    return this.http
    .get<GasStations>('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAA/05')
    
  }
  
}


/*
.subscribe((response)=> {
      this.gasData = response.ListaEESSPrecio
      console.log(this.gasData[0]);
      
    });
*/




// To parse this data:
//
//   import { Convert, GasStations } from "./file";
//
//   const gasStations = Convert.toGasStations(json);

export interface GasStations {
  Fecha:             string;
  ListaEESSPrecio:   ListaEESSPrecio[];
  Nota:              string;
  ResultadoConsulta: string;
}

export interface ListaEESSPrecio {
  "C.P.":                               string;
  Dirección:                            string;
  Horario:                              string;
  Latitud:                              string;
  Localidad:                            string;
  "Longitud (WGS84)":                   string;
  Margen:                               Margen;
  Municipio:                            string;
  "Precio Biodiesel":                   string;
  "Precio Bioetanol":                   string;
  "Precio Gas Natural Comprimido":      PrecioGasNaturalComprimido;
  "Precio Gas Natural Licuado":         string;
  "Precio Gases licuados del petróleo": PrecioGasesLicuadosDelPetróleo;
  "Precio Gasoleo A":                   string;
  "Precio Gasoleo B":                   string;
  "Precio Gasoleo Premium":             string;
  "Precio Gasolina 95 E10":             string;
  "Precio Gasolina 95 E5":              string;
  "Precio Gasolina 95 E5 Premium":      PrecioGasolina95E5Premium;
  "Precio Gasolina 98 E10":             string;
  "Precio Gasolina 98 E5":              string;
  "Precio Hidrogeno":                   string;
  Provincia:                            Provincia;
  Remisión:                             Remisión;
  Rótulo:                               string;
  "Tipo Venta":                         TipoVenta;
  "% BioEtanol":                        BioEtanol;
  "% Éster metílico":                   BioEtanol;
  IDEESS:                               string;
  IDMunicipio:                          string;
  IDProvincia:                          string;
  IDCCAA:                               string;
}

export enum BioEtanol {
  The00 = "0,0",
}

export enum Margen {
  D = "D",
  I = "I",
  N = "N",
}

export enum PrecioGasNaturalComprimido {
  Empty = "",
  The2399 = "2,399",
}

export enum PrecioGasesLicuadosDelPetróleo {
  Empty = "",
  The0759 = "0,759",
  The0769 = "0,769",
  The0778 = "0,778",
  The0779 = "0,779",
  The0799 = "0,799",
  The0889 = "0,889",
}

export enum PrecioGasolina95E5Premium {
  Empty = "",
  The1399 = "1,399",
  The1479 = "1,479",
}

export enum Provincia {
  PalmasLas = "PALMAS (LAS)",
  SantaCruzDeTenerife = "SANTA CRUZ DE TENERIFE",
}

export enum Remisión {
  Dm = "dm",
  Om = "OM",
}

export enum TipoVenta {
  P = "P",
  R = "R",
}

// Converts JSON strings to/from your types
export class Convert {
  public static toGasStations(json: string): GasStations {
      return JSON.parse(json);
  }

  public static gasStationsToJson(value: GasStations): string {
      return JSON.stringify(value);
  }
}
