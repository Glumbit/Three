class teamCarousel extends carousel {
	constructor(target: string) {
		super(target)
	}

	moveTeam() {
		const moveForward = () => {
			this.moveHorisontal('team__frame_horisontal', `team__item`, '+')
		}
		const moveBackward = () => {
			this.moveHorisontal('team__frame_horisontal', `team__item`, '-')
		}
		this.next?.addEventListener('click', moveForward)
		this.prew?.addEventListener('click', moveBackward)
	}
}

const teamSemple = new teamCarousel('team__carousel ')
teamSemple.moveTeam()