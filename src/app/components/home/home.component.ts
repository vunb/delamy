import {Component, OnInit} from '@angular/core';
import {HotkeysService, Hotkey} from 'angular2-hotkeys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public listSents: string[] = [''];
  constructor(private _hotkeysService: HotkeysService) {}

  ngOnInit() {
    this._hotkeysService.add(
        new Hotkey('enter', (event: KeyboardEvent): boolean => {
          console.log('Typed hotkey');
          this.listSents.push('');
          return false;  // Prevent bubbling
        }, ['INPUT', 'TEXTAREA']));
  }
}
