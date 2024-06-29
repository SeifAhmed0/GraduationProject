import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repfilter',
})
export class RepfilterPipe implements PipeTransform {

  transform(represntors:any[] , term:string): any {
    return represntors.filter((item)=>item.associationName.toLowerCase().includes(term.toLowerCase()));
  }

}
