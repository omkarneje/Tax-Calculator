document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelectorAll('.close');
    const inputs =document.querySelectorAll('input');

    inputs.forEach((ele)=>{      
      ele.addEventListener('input',(e)=>{
        e.target.classList.remove('is-invalid')
        e.target.classList.remove('is-valid')
        if(!isValidNumber(e.target.value) && e.target.value){
          e.target.classList.add('is-invalid')
        }
        else if(e.target.value)  {
          e.target.classList.add('is-valid')
        }
      })
   
   
    })
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      validateForm();
    });
  
    closeModal.forEach((ele)=> {
        ele.addEventListener('click', function() {
            modal.style.display = 'none';
          });
    })
  
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });

  
    function validateForm() {
      
      const age = document.getElementById('age').value;
      const income = document.getElementById('income').value;
      const extraIncome = document.getElementById('extraIncome').value;
      const deductions = document.getElementById('deductions').value;
  
      clearErrors();
  
      if (age === '' || age === 'none' ) {
        const agerrorElement = document.getElementById('age-error');
        agerrorElement.style.display = 'inline-block';
        return;
      }

      if (!isValidNumber(income) || income === 'none' ) {
        showError('income-error', 'Invalid Input');
        return;
      }

      if (!isValidNumber(extraIncome)) {
        showError('extraIncome-error', 'Invalid Input');
        return;
      }

      if (!isValidNumber(deductions)) {
        showError('deductions-error', 'Invalid Input');
        return;
      }
  
      const tax = calculateTax(parseFloat(income), parseFloat(extraIncome), parseFloat(deductions), age);
      displayModal(tax);
    }

    
  
    function isValidNumber(input) {
      return !isNaN(input);
    }
  
    function showError(id, errorMessage) {
      const errorElement = document.getElementById(id);
      errorElement.classList.add("is-invalid");
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'inline-block';
    }
  
    function clearErrors() {
      const errorElements = document.querySelectorAll('.error-tooltip');
      errorElements.forEach(function(element) {
        element.style.display = 'none';
      });
    }
  
    function calculateTax(income, extraIncome, deductions, age) {
      const totalIncome = income + extraIncome - deductions;
      let taxRate = 0;
  
      if (totalIncome > 800000) {
        if (age === '<40') {
          taxRate = 0.3;
        } else if (age === '≥40<60') {
          taxRate = 0.4;
        } else if (age === '≥60') {
          taxRate = 0.1;
        }
      }
      else{

      }
      
      let Ttax = taxRate * (totalIncome - 800000);

      let final = totalIncome - Ttax; 
      return final;
    }
  
    function displayModal(final) {
      const resultElement = document.getElementById('result');
      resultElement.textContent = `Your overall income will be ₹${final.toFixed(2)} after tax deductions`;
      modal.style.display = 'block';
    }
  });