class carousel {

	//поля
	protected target: Element | null
	protected next: Element | null
	protected prew: Element | null

	//конструктор
	constructor(target: string) {
		this.target = document.querySelector(`.${target}`)
		this.next = this.target!.querySelector(`.carousel__btn_next`)
		this.prew = this.target!.querySelector(`.carousel__btn_prew`)
	}

	//метод передвижения горизонтально ленты в зависсимости от кнопки 

	moveHorisontal(frame: string, item: string, sign: string): void {
		const belt = this.target!.querySelector(`.belt-horisontal`);
		let beltMove: any = Number(belt?.getAttribute('style')?.replace('translate: -', '').replace('px 0', ''));
		const ItemWidth = belt?.querySelector(`.${item}`)?.clientWidth;

		if (belt?.hasAttribute('style') == false) {
			beltMove = ItemWidth
		} else {
			(sign == '+') ? beltMove += ItemWidth : beltMove -= ItemWidth!
		}

		const FrameWidth = this.target!.querySelector(`.${frame}`)?.clientWidth;
		let FrameSpace = belt?.clientWidth! - FrameWidth!;

		if (sign == '+') {
			(beltMove <= FrameSpace) ? belt?.setAttribute('style', `translate: -${beltMove}px 0`) : belt?.setAttribute('style', `translate: -0px 0`)
		} else {
			(beltMove >= 0) ? belt?.setAttribute('style', `translate: -${beltMove}px 0`) : belt?.setAttribute('style', `translate: -${FrameSpace!}px 0`)
		}
	}

	moveVertical(belt: string, item: string, sign: string): void {
		const verticalBelt = this.target!.querySelector(`.${belt}`);
		const verticalBeltHeight = verticalBelt?.clientHeight
		const verticalItemHeight = verticalBelt?.querySelector(`.${item}`)?.clientHeight;
		let verticalMove: any = Number(verticalBelt?.getAttribute('style')?.replace('translate: 0 -', '').replace('px', ''));

		if (verticalBelt?.hasAttribute('style') == false) {
			verticalMove = verticalItemHeight
		} else {
			if (sign == '+') {
				verticalMove += verticalItemHeight
			} else {
				verticalMove -= verticalItemHeight!
			}
		}

		if (sign == '+') {
			if (verticalMove != verticalBeltHeight) {
				verticalBelt?.setAttribute('style', `translate: 0 -${verticalMove}px`)
			}
			else {
				verticalBelt?.setAttribute('style', `translate: 0 -0px`)
			}
		} else {
			if (verticalMove >= 0) {
				verticalBelt?.setAttribute('style', `translate: 0 -${verticalMove}px`)
			}
			else {
				verticalBelt?.setAttribute('style', `translate: 0 -${verticalBeltHeight! - verticalItemHeight!}px`)
			}
		}
	}
}