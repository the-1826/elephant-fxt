const encodings = [
"АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя", // Русский текст
"ЂЃ‚ѓ„……†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—­™љ›њќћџ ЎўЈ¤ҐҐ§Ё©Є«¬®Ї°±Ііґµ¶·ё№є»јЅѕї", // Кодировка 1С (GTA 3)
"ASBFDEEG3N#KVMH0YPCTJOXQ4UUљ›LZWRasbfdeeg`n&kvmh^ypctjoxq@uuклlzwr" // Кодировка Фаргус (GTA 3)
];

const fileInput = document.getElementById("file");
const toGo = document.getElementById("go");
const initEncoding = document.getElementById("init-encoding");
const targetEncoding = document.getElementById("target-encoding");
const fileName = document.getElementById("file-name");
targetEncoding.innerHTML = targetEncoding.innerHTML + initEncoding.innerHTML;

toGo.onclick = () => toProcess();

fileInput.addEventListener('change', fileUploadShow); 

function fileUploadShow() {
    const file = fileInput.files[0];
	if (file) {
		fileName.innerHTML = file.name;
	}
}

function toProcess() {
    const file = fileInput.files[0];
	if (!(file)) {
		alert("No file uploaded.");
		return;
	}
	const initialValue = initEncoding.selectedIndex - 1;
	const targetValue = targetEncoding.selectedIndex - 1;
	if (initialValue < 0) {
		alert("Missing initial encoding option.");
		return;
	}
	if (targetValue < 0) {
		alert("Missing target encoding option.");
		return;
	}
	if (initialValue == targetValue) {
		alert("No idential encoding options allowed.");
		return;
	}
	convertFile(file, initialValue, targetValue)
}

function convertFile(file, initialEncoding, targetEncoding) {
    let reader = new FileReader();
    reader.readAsText(file);
	reader.onload = function() {
		const readerText = reader.result;
		let content = '';
		const convertedChars = Array.from(readerText).map(char => {
			const charIndex = encodings[initialEncoding].indexOf(char);
			return charIndex !== -1 ? encodings[targetEncoding].charAt(charIndex) : char;
		});
    content += convertedChars.join('');
    createTextFile("converted.fxt",content);
	};
}