(function () {
	const audioElement = new Audio('');
	const playBtn = document.querySelector(".control-play");
	const prevBtn = document.querySelector(".control-prev");
	const nextBtn = document.querySelector(".control-next");
	const musicElementList = document.querySelector(".music-list");
	
	let currentMusicID = 0;
	let playSound = false;
	let audioList = [
		{
			path: 'path-to-music',
			name: 'music name',
		},
	]

	audioList.forEach((audio, id) => addMusicElement({ ...audio, id: id }, id === 0))

	const childrens = Array.from(musicElementList.children);

	function addMusicElement(audioProps, dataCheck = false) {
		const li = document.createElement('li');
		li.setAttribute('data-check', dataCheck);
		li.setAttribute('data-id', audioProps.id);
		li.setAttribute('class', 'music-element');
		li.innerText = `${audioProps.id}-${audioProps.name}`;
		musicElementList.appendChild(li);
	}

	function playOrStopMusic(isPlay = true) {
		if (isPlay) {
			audioElement.src = audioList[currentMusicID].path;
			audioElement.addEventListener('canplaythrough', _ => audioElement.play())
			playBtn.children[0].name = 'pause';
		} else {
			audioElement.pause();
			playBtn.children[0].name = 'play';
		}

	}

	function changeSelectMusicStyle(childrenID) {
		childrens[currentMusicID].dataset.check = false;
		currentMusicID = +childrenID;
		childrens[currentMusicID].dataset.check = true;
		childrens[currentMusicID].scrollIntoView({ behavior: "smooth", block: "center" })
	}
	
	childrens.forEach((children) => {
		children.addEventListener('click', () => {
			changeSelectMusicStyle(children.dataset.id);
			playOrStopMusic();
			playSound = true;
		})
	})

	playBtn.addEventListener('click', _ => {
		playSound = !playSound;
		playOrStopMusic(playSound);
	})

	prevBtn.addEventListener('click', _ => {
		let id = currentMusicID - 1;
		if (id < 0) id = childrens.length - 1;
		changeSelectMusicStyle(id)
		playOrStopMusic();
		playSound = true;
	})

	nextBtn.addEventListener('click', _ => {
		let id = currentMusicID + 1;
		if (id >= childrens.length) id = 0;
		changeSelectMusicStyle(id)
		playOrStopMusic();
		playSound = true;
	})

})()