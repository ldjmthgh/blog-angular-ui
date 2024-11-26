import {Directive, ElementRef, Input} from '@angular/core';
import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Directive({
  selector: '[appAppInputDebounce]'
})
export class AppInputDebounceDirective {
  input$!: Observable<any>;
  @Input('appAppInputDebounce') handler: (e: any) => void = () => {};
  constructor(el: ElementRef) {
    this.input$ = fromEvent(el.nativeElement, 'input').pipe(
      debounceTime(500),
      // 等待文本发生变化
      distinctUntilChanged()
    );
    this.input$.subscribe(this.handleChange);
  }

  handleChange = (e: any) => {
    this.handler(e);
  }
}
