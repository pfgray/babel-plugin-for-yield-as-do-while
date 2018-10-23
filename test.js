const babel = require('@babel/core');
const plugin = require('./src/index.js');

const source = `
do {
  foo << getFoo("http://google.com")
  bar << getBar
  baz << getBaz
} while(
  foo + bar + baz
)
`;

const {code} = babel.transform(source, {plugins: [plugin]});
console.log('source: ');
console.log(source);
console.log('result: ');
console.log(code);
