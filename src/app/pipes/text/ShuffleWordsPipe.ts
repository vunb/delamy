import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { ShufflePipe } from 'angular-pipes';


@Pipe({
  name: 'ShuffleWords'
})
export class ShuffleWordsPipe implements PipeTransform {

  constructor(private shufflePipe: ShufflePipe) {}

  /**
   * Tranform text
   * @param value
   * @param args
   */
  transform(value: string, args?: any): string {
    if (!value) { return null; }

    const tokens = value.split(' ');
    const result: string[] = this.shufflePipe.transform(tokens);
    return result.join(' ');
  }

}
