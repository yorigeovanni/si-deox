/**
 * Evaluates Odoo domain expressions for conditional rendering
 * @param {string} expression - The Odoo domain expression
 * @param {Object} context - The form values context
 * @returns {boolean} - Whether the condition is met
 */
export function evaluateExpression(expression, context = {}) {
    if (!expression) return false;
    
    try {
      // Handle basic boolean expressions
      if (expression === 'True' || expression === 'true') return true;
      if (expression === 'False' || expression === 'false') return false;
  
      // Handle NOT expressions
      if (expression.startsWith('not ')) {
        const remainingExpr = expression.substring(4);
        return !evaluateExpression(remainingExpr, context);
      }
  
      // Handle OR expressions
      if (expression.includes(' or ')) {
        const parts = expression.split(' or ');
        return parts.some(part => evaluateExpression(part.trim(), context));
      }
  
      // Handle AND expressions
      if (expression.includes(' and ')) {
        const parts = expression.split(' and ');
        return parts.every(part => evaluateExpression(part.trim(), context));
      }
  
      // Handle comparison expressions
      if (expression.includes('==')) {
        const [left, right] = expression.split('==').map(s => s.trim());
        return context[left] === right.replace(/['"]/g, '');
      }
  
      if (expression.includes('!=')) {
        const [left, right] = expression.split('!=').map(s => s.trim());
        return context[left] !== right.replace(/['"]/g, '');
      }
  
      if (expression.includes('in')) {
        const [left, right] = expression.split('in').map(s => s.trim());
        const list = eval(right); // Safely evaluate array literal
        return Array.isArray(list) && list.includes(context[left]);
      }
  
      // Handle field existence checks
      return !!context[expression];
  
    } catch (error) {
      console.warn('Error evaluating expression:', expression, error);
      return false;
    }
  }