class projectCarousel extends carousel {
	constructor(target: string) {
		super(target)
	}

	moveProject() {
		const moveForward = () => {
			this.moveHorisontal('projects__frame_horisontal', `projects__img-horisontal`, '+')
			this.moveVertical('projects__belt-vertical', `projects__card-vertical`, '+')
		}
		const moveBackward = () => {
			this.moveHorisontal('projects__frame_horisontal', `projects__img-horisontal`, '-')
			this.moveVertical('projects__belt-vertical', `projects__card-vertical`, '-')
		}
		this.next?.addEventListener('click', moveForward)
		this.prew?.addEventListener('click', moveBackward)
	}
}
const projectSemple = new projectCarousel('projects__carousel')
projectSemple.moveProject()