import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-digit',
  templateUrl: './animated-digit.component.html',
  styleUrls: ['./animated-digit.component.scss'],
})
export class AnimatedDigitComponent implements OnInit {
  @Input() digit: any;
  constructor() { }

  ngOnInit() {}

}
