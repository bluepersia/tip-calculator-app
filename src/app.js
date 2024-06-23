const inputBill = document.getElementById ('input-bill');
const inputNum = document.getElementById ('input-num');
const customTipEl = document.querySelector ('.main__tip-select__custom');
const grid = document.querySelector ('.main__tip-select__grid');
const tipPerPersonEl = document.getElementById ('tip-per-person');
const totalPerPersonEl = document.getElementById ('total-per-person');
const resetBtn = document.querySelector ('.main__btn-reset');

inputBill.addEventListener ('change', onChanged);
inputNum.addEventListener ('change', onChanged);
customTipEl.addEventListener ('change', changedCustomTip);
grid.addEventListener ('click', clickedGrid);
resetBtn.addEventListener ('click', reset);
document.querySelector ('.main__col-1').addEventListener ('submit', onSubmit);

let tip = 0;
let customTip = -1;

function onSubmit (e)
{
    e.preventDefault ();

    validateAndRender ();
}




function clickedGrid (e)
{

    if (e.explicitOriginalTarget.type === 'number')
        return;

    const tipBtn =  e.target.closest ('.main__tip-select__btn');

    if (tipBtn)
    {
        customTip = -1;
        tip = Number (tipBtn.dataset.value);

        resetBtn.disabled = false;

        validateAndRender ();
    }
}

function changedCustomTip (e)
{
    e.preventDefault ();

    customTip = Number (customTipEl.value / 100);
    tip = 0;

    resetBtn.disabled = false;


    validateAndRender ();

}

function onChanged ()
{
    validateAndRender ();
    resetBtn.disabled = false;
}

function validateAndRender () 
{
    let billCheck = checkInput (inputBill);
    let numCheck = checkInput (inputNum);


    grid.querySelectorAll ('.main__tip-select__btn').forEach (el => el.classList.remove ('main__tip-select__btn--active'));

  
    if (tip)
        grid.querySelector (`.main__tip-select__btn[data-value="${tip}"]`).classList.add ('main__tip-select__btn--active');


    tipPerPersonEl.textContent = `$0.00`;
    totalPerPersonEl.textContent = `$0.00`;

    let finalTip = tip;
    if (customTip > -1)
        finalTip = customTip;

    if (billCheck && numCheck && finalTip)
    {
        let tipAmount = Number (inputBill.value) * finalTip;
        let numPeople = Number (inputNum.value);
        tipPerPersonEl.textContent = `$${(tipAmount / numPeople).toFixed(2)}`;
        totalPerPersonEl.textContent = `$${((Number (inputBill.value) + tipAmount) / numPeople).toFixed(2)}`;
    }
}



function checkInput (input)
{
    input.parentElement.classList.remove ('main__input-container--invalid');

    if (!input.value || input.value === '0')
    {
        input.parentElement.querySelector ('.main__input-error').textContent = "Can't be zero";
        input.parentElement.classList.add ('main__input-container--invalid');
        return false;
    }

    return true;
}

resetBtn.disabled = true;

function reset () 
{
    inputBill.value = 0;
    inputNum.value = 0;
    tip = 0;
    customTip = -1;

    tipPerPersonEl.textContent = `$0.00`;
    totalPerPersonEl.textContent = `$0.00`;

    resetBtn.disabled = true;

    grid.querySelectorAll ('.main__tip-select__btn').forEach (el => el.classList.remove ('main__tip-select__btn--active'));

    inputBill.parentElement.classList.remove ('main__input-container--invalid');
    inputNum.parentElement.classList.remove ('main__input-container--invalid');
    

}