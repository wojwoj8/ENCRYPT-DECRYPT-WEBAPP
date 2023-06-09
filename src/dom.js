import ciphers from './logic';
import saveFile from './download';

function createHeader() {
  const header = document.createElement('div');
  const title = document.createElement('h1');

  header.classList = 'header';
  title.textContent = 'ENCRYPT/DECRYPT';
  header.appendChild(title);

  return header;
}

function createMain() {
  const main = document.createElement('div');
  const mainContent = document.createElement('div');

  mainContent.classList = 'main-content';
  main.classList = 'main';
  main.appendChild(mainContent);

  return main;
}

function createFooter() {
  const footer = document.createElement('div');
  footer.innerHTML = '<p>Created by <a href="https://github.com/wojwoj8">wojwoj8</a></p>';
  footer.classList = 'footer';
  return footer;
}

function createMainContent() {
  const mainContent = document.querySelector('.main-content');
  const inputDiv = document.createElement('div');
  inputDiv.classList = 'inputDiv';
  const outputDiv = document.createElement('div');
  outputDiv.classList = 'outputDiv';
  const inputTextarea = document.createElement('textarea');
  const outputTextarea = document.createElement('textarea');

  const inputP = document.createElement('p');
  const outputP = document.createElement('p');

  inputP.innerHTML = '<label for="inputTextarea">Input:</label>';
  outputP.innerHTML = '<label for="outputTextarea">Output:</label>';

  inputTextarea.classList = 'inputTextarea';
  inputTextarea.setAttribute('name', 'inputTextarea');
  outputTextarea.classList = 'outputTextarea';
  outputTextarea.setAttribute('name', 'outputTextarea');
  const select = document.createElement('select');
  select.id = 'cipher-select';
  select.innerHTML = `
  <select id="cipher-select">
    <option value="md5">MD5</option>
    <option value="aes">AES</option>
    <option value="des">DES</option>
    <option value="rc4">RC4</option>
    <option value="sha256">SHA256</option>
    <option value="sha512">SHA512</option>
  </select>`;

  select.addEventListener('change', selectHandler);

  inputDiv.appendChild(inputP);
  inputDiv.appendChild(inputTextarea);
  outputDiv.appendChild(outputP);
  outputDiv.appendChild(outputTextarea);
  mainContent.appendChild(inputDiv);
  mainContent.appendChild(select);
  mainContent.appendChild(outputDiv);
}

function createButtons() {
  const main = document.querySelector('.main');
  const buttonsDiv = document.createElement('div');
  const download = document.createElement('div');
  download.classList = 'downloadDiv';
  const downButt = document.createElement('button');
  downButt.classList = 'downloadButt';
  downButt.textContent = 'Download';
  download.appendChild(downButt);
  buttonsDiv.classList = 'buttonsDiv';
  const button = document.createElement('button');
  button.textContent = 'Encrypt';
  button.classList = 'encryptButton';
  buttonsDiv.appendChild(button);
  button.addEventListener('click', encryptHandler);
  main.appendChild(buttonsDiv);
  main.appendChild(download);
}

function downloadHandler() {
  const button = document.querySelector('.downloadButt');
  button.addEventListener('click', saveFile);
}
function selectHandler() {
  const cipherSelect = document.querySelector('#cipher-select');
  const selectedCipher = cipherSelect.value;
  const inputDiv = document.querySelector('.inputDiv');
  const buttonsDiv = document.querySelector('.buttonsDiv');
  let keyInput = null;

  const existingKeyInput = inputDiv.querySelector('.keyInput');
  const existingDecButt = buttonsDiv.querySelector('.decryptButton');
  if (existingKeyInput) {
    existingKeyInput.parentNode.remove();
    existingDecButt.remove();
  }

  if (selectedCipher === 'aes' || selectedCipher === 'des' || selectedCipher === 'rc4') {
    const button = document.createElement('button');
    button.classList = 'decryptButton';
    button.textContent = 'Decrypt';
    button.addEventListener('click', decryptHandler);
    const cont = document.createElement('div');
    keyInput = document.createElement('input');
    keyInput.classList = 'keyInput';
    keyInput.setAttribute('name', 'additionalInputTextarea');

    const inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', 'additionalInputTextarea');
    inputLabel.textContent = 'Enter key:';
    buttonsDiv.appendChild(button);
    cont.appendChild(inputLabel);
    cont.appendChild(keyInput);
    inputDiv.appendChild(cont);
  }
}

function encryptHandler() {
  const input = document.querySelector('.inputTextarea');
  const output = document.querySelector('.outputTextarea');
  const cipherSelect = document.querySelector('#cipher-select');
  const selectedCipher = cipherSelect.value;
  const inputValue = input.value;
  const keyInput = document.querySelector('.keyInput');
  let keyValue;
  if (keyInput) {
    keyValue = keyInput.value;
  }

  output.innerHTML = '';
  if (selectedCipher === 'aes') {
    output.value = ciphers.encryptAES(inputValue, keyValue);
  } else if (selectedCipher === 'des') {
    output.value = ciphers.encryptDES(inputValue, keyValue);
  } else if (selectedCipher === 'rc4') {
    output.value = ciphers.encryptRC4(inputValue, keyValue);
  } else if (selectedCipher === 'md5') {
    output.value = ciphers.encryptMD5(inputValue);
  } else if (selectedCipher === 'sha256') {
    output.value = ciphers.encryptSHA256(inputValue);
  } else if (selectedCipher === 'sha512') {
    output.value = ciphers.encryptSHA512(inputValue);
  }
//   console.log(inputValue);
//   console.log(selectedCipher);
}

function decryptHandler() {
  const input = document.querySelector('.inputTextarea');
  const output = document.querySelector('.outputTextarea');
  const cipherSelect = document.querySelector('#cipher-select');
  const selectedCipher = cipherSelect.value;
  const inputValue = input.value;
  const keyInput = document.querySelector('.keyInput');
  const keyValue = keyInput.value;

  output.innerHTML = '';
  if (selectedCipher === 'aes') {
    output.value = ciphers.decryptAES(inputValue, keyValue);
  } else if (selectedCipher === 'des') {
    output.value = ciphers.decryptDES(inputValue, keyValue);
  } else if (selectedCipher === 'rc4') {
    output.value = ciphers.decryptRC4(inputValue, keyValue);
  }
  //   console.log(inputValue);
  //   co
}

function webInit() {
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
  content.appendChild(createMain());
  content.appendChild(createFooter());
  createMainContent();
  createButtons();
  downloadHandler();
  return content;
}
export default webInit;
