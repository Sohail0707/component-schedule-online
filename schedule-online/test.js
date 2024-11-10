const nextBtn = document.createElement('button');
nextBtn.className = 'btn--next';
nextBtn.innerHTML = `<span class="text">next</span>`;

const previousBtn = document.createElement('button');
previousBtn.className = 'btn--previous';
previousBtn.innerHTML = `<span class="text">previous</span>`;

const main_page_container = document.querySelector('#__main--container');
main_page_container.appendChild(previousBtn);
main_page_container.appendChild(nextBtn);

let count = 0;

function init_01() {
	nextBtn.addEventListener('click', () => {
		if (count === 0) {
			console.log(`next btn clicked for ${count}`);
			count++;
		}
	});

	previousBtn.addEventListener('click', () => {
		if (count === 1) {
			console.log(`previous btn clicked for ${count}`);
			count--;
		}
	});
}

function init_02() {
	nextBtn.addEventListener('click', () => {
		if (count === 1) {
			console.log(`next btn clicked for ${count}`);
			count++;
		}
	});

	previousBtn.addEventListener('click', () => {
		if (count === 2) {
			console.log(`previous btn clicked for ${count}`);
			count--;
		}
	});
}

function init_03() {
	nextBtn.addEventListener('click', () => {
		if (count === 2) {
			console.log(`next btn clicked for ${count}`);
			count++;
		}
	});

	previousBtn.addEventListener('click', () => {
		if (count === 3) {
			console.log(`previous btn clicked for ${count}`);
			count--;
		}
	});
}

function init_04() {
	nextBtn.addEventListener('click', () => {
		if (count === 3) {
			console.log(`next btn clicked for ${count}`);
			count++;
		}
	});

	previousBtn.addEventListener('click', () => {
		if (count === 4) {
			console.log(`previous btn clicked for ${count}`);
			count--;
		}
	});
}

setTimeout(() => {
	init_01();
}, 1000);

setTimeout(() => {
	init_02();
}, 2000);

setTimeout(() => {
	init_03();
}, 3000);

setTimeout(() => {
	init_04();
}, 4000);
