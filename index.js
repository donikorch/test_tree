function handleClick() {
  const input = document.getElementById('input').value.trim();
  const outputTextarea = document.getElementById('output');
  outputTextarea.textContent = drawTree(parseInput(input));
}

function parseInput(input) {
  let stack = [];
  let current = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      stack.push(current);
      current = [];
    } else if (input[i] === ')') {
      if (stack.length === 0) {
        throw new Error('Invalid input: unmatched parenthesis');
      }
      let last = stack.pop();
      last.push(current);
      current = last;
    } else if (input[i] !== ' ') {
      let num = '';
      while (
        i < input.length &&
        input[i] !== ' ' &&
        input[i] !== ')' &&
        input[i] !== '('
      ) {
        num += input[i];
        i++;
      }
      i--;
      current.push(Number(num));
    }
  }
  if (stack.length !== 0) {
    throw new Error('Invalid input: unmatched parenthesis');
  }
  return current[0];
}

function drawTree(arr, prefix = '', isLastChild = true) {
  let tree = '';
  let edge = isLastChild ? '└── ' : '├── ';
  let verticalLine = isLastChild ? '    ' : '│   ';

  for (let i = 0; i < arr.length; i++) {
    let isLastSibling = i === arr.length - 1;
    tree += prefix + edge + arr[i] + '\n';
    if (Array.isArray(arr[i + 1])) {
      tree += drawTree(arr[i + 1], prefix + verticalLine, isLastSibling);
      i++;
    }
    edge = isLastSibling ? '└── ' : '├── ';
    verticalLine = isLastSibling ? '    ' : '│   ';
  }
  return tree;
}
