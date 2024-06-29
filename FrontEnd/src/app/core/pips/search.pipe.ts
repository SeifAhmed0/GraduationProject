import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',

})
export class SearchPipe implements PipeTransform {

  transform(players:any[] , term:string): any {
    return players.filter((item)=>item.name.toLowerCase().includes(term.toLowerCase()));
  }

}
