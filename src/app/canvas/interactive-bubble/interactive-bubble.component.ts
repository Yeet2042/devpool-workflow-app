import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-interactive-bubble',
  standalone: true,
  imports: [],
  templateUrl: './interactive-bubble.component.html',
  styleUrl: './interactive-bubble.component.scss'
})
export class InteractiveBubbleComponent implements OnInit, OnDestroy {
  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;
  private moveAnimation: any;
  private mouseMoveListener!: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const interBubble = this.el.nativeElement.querySelector('.interactive') as HTMLDivElement;

    this.mouseMoveListener = this.renderer.listen('window', 'mousemove', (event: MouseEvent) => {
      this.tgX = event.clientX;
      this.tgY = event.clientY;
    });

    this.move(interBubble);
  }

  move(interBubble: HTMLDivElement): void {
    this.curX += (this.tgX - this.curX) / 20;
    this.curY += (this.tgY - this.curY) / 20;
    interBubble.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;

    this.moveAnimation = requestAnimationFrame(() => this.move(interBubble));
  }

  ngOnDestroy(): void {
    if (this.moveAnimation) {
      cancelAnimationFrame(this.moveAnimation);
    }

    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }
}
