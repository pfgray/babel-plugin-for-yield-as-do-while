
module.exports = function({ types: t }) {
  return {
    visitor: {
      DoWhileStatement: function(path) {
        const {body, test} = path.node;
        if(body && isAllBinaryExpressions('<<', body.body)){
          path.replaceWith(
            expressYourself(t, test, body.body)
          );
        }
      }
    }
  };
}

function expressYourself(t, yeildExpr, chains) {
  if(chains.length > 0) {
    const memberFunc = chains.length === 1 ? "map" : "chain";
    const [currentChain, ...restChains] = chains;
    const {left, right} = currentChain.expression;
    return t.callExpression(t.memberExpression(right, t.identifier(memberFunc)), [
      t.arrowFunctionExpression([left], expressYourself(t, yeildExpr, restChains))
    ])
  } else {
    return yeildExpr;
  }
}

function isAllBinaryExpressions(op, expressions) {
  return expressions.length > 0 && (
    expressions.reduce((agg, exp) => agg && exp.expression.operator === op, true)
  )
}