import { Injectable } from '@angular/core';

@Injectable()
export class ToolService {

  constructor() { }
  getKeys(val:any){
    return [val.name,val.text,val.type,val.interface,val.default]

  }
}
