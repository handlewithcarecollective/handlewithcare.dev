class Xor {
  constructor(key) {
    this.key = key;
  }
  encode(input) {
    let output = "";

    for (let i = 0; i < input.length; ++i) {
      const hexInput = input.charCodeAt(i);
      const hexOutput = hexInput ^ this.key;

      output += this.fromHex(hexOutput);
    }

    return output;
  }
  decode(input) {
    let output = "";

    for (let i = 0; i < input.length; i += 2) {
      const hexInput = this.toHex(input, i);
      const hexOutput = hexInput ^ this.key;

      output += String.fromCharCode(hexOutput);
    }

    return output;
  }
  fromHex(hex) {
    let text = hex.toString(16);

    if (hex < 16) {
      text = "0" + text;
    }

    return text;
  }
  toHex(text, i) {
    const sequence = text.substr(i, 2);

    return parseInt(sequence, 16);
  }
}

class TextCoder {
  constructor(coder) {
    this.coder = coder;
  }
  encode(span) {
    this.apply("encode", span);
  }
  decode(span) {
    this.apply("decode", span);
  }
  apply(action, span) {
    const text = span.firstChild;

    text.nodeValue = this.coder[action](text.nodeValue);
    span.dataset.xorDecoded = "true";
  }
}

function decode(selector, coder) {
  const nodes = document.querySelectorAll(selector);
  const method = coder.decode.bind(coder);

  nodes.forEach(method);
}

const key = 127;
const xor = new Xor(key);
const textXor = new TextCoder(xor);

decode('[data-xor-decoded="false"]', textXor);
