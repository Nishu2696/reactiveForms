import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringCast'
})
export class AppstringPipe implements PipeTransform {

  transform(index:number){
        
    return String(index);
}

}
