export default class Form {
  constructor(el) {
    this.el = el;
  }
  
  init() {
    this.el.setAttribute('novalidate', true);
    this.el.addEventListener('blur', (e) => this.validateField(e.target), true);
    this.el.addEventListener('submit', (e) => {
      if (!this.el.checkValidity()) {
        e.preventDefault()
        this.validate();
      }
    });
  }
  
  validate() {
    Array.from(this.el.elements).forEach((field) => this.validateField(field));
  }

  validateField(field) {
    if (field.type === 'submit') return;
    const error = this.getFieldError(field);
    if (this.isFieldAlreadyInError(field)) this.clearFieldError(field);
    if (error) this.showFieldError(field, error);
  }

  isFieldAlreadyInError(field) {
    return field.parentNode.classList.contains('has-error');
  }

  getFieldError(field) {
    const fieldName = field.getAttribute('data-validation-label') || 'This field';
    
    if (field.validity.valid) return;
    if (field.validity.valueMissing) return `${fieldName} is required.`;
    if (field.validity.typeMismatch) return `${field.getAttribute('title') || `${fieldName} does not match the expected format.`}`;
    if (field.validity.tooShort) return `${fieldName} should be at least ${field.getAttribute('minLength')} characters long.`;
    if (field.validity.tooLong) return `${fieldName} should be no more than ${field.getAttribute('maxLength')} characters long.`;
    if (field.validity.badInput) return `${fieldName} should be a number.`;
    if (field.validity.patternMismatch) return `${field.getAttribute('title') || `${fieldName} does not match the expected format.`}`;
    if (field.validity.rangeUnderflow) return `${fieldName} should be more than ${parseFloat(field.getAttribute('min')) - 1}.`;
    if (field.validity.rangeOverflow) return `${fieldName} should be less than ${parseFloat(field.getAttribute('max')) + 1}.`;
    if (field.validity.stepMismatch) return field.validationMessage;
  }

  clearFieldError(field) {
    field.removeAttribute('aria-describedby');
    field.parentNode.classList.remove('has-error');
    field.parentNode.querySelector('.help-block').remove();
  }

  showFieldError(field, error) {
    const errorNodeId = `error-for-${field.name}`;
    let errorNode = document.createElement('span');
    errorNode.innerText = error;
    errorNode.classList.add('help-block');
    errorNode.setAttribute('id', errorNodeId);
    field.setAttribute('aria-describedby', errorNodeId);
    field.parentNode.classList.add('has-error');
    field.parentNode.appendChild(errorNode);
  }
}