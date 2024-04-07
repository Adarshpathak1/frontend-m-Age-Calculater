
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    // Get current date
    const currentDate = new Date();
    let currDay = currentDate.getDate();
    let currMonth = currentDate.getMonth() + 1; // months are zero-based
    let currYear = currentDate.getFullYear();

    // Get user input
    const birthDay = parseInt(document.getElementById("day").value);
    const birthMonth = parseInt(document.getElementById("month").value);
    const birthYear = parseInt(document.getElementById("year").value);

    // Validation
    if (!birthDay || !birthMonth || !birthYear ||
        isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear) ||
        birthDay < 1 || birthDay > 31 || birthMonth < 1 || birthMonth > 12 ||
        birthYear > currYear || birthYear <1900 || (birthMonth === 2 && birthDay > 29) ||
        ((birthMonth === 4 || birthMonth === 6 || birthMonth === 9 || birthMonth === 11) && birthDay > 30)) {
       
            // document.getElementsByClassName("warning").style.color = "red";
            alert("Please enter a valid date of birth.");
        return;
    }

    // Calculate age
    let years = currYear - birthYear;
    let months = currMonth - birthMonth;
    let days = currDay - birthDay;

    // Adjust age if birthdate hasn't occurred yet this year
    if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
    }

    // Calculate remaining days
    if (days < 0) {
        const prevMonth = new Date(currYear, currMonth - 1, 0);
        days += prevMonth.getDate();
        months--;
    }

    // Display age with animation
    animateNumber(document.getElementById("changeYear"), years);
    animateNumber(document.getElementById("changeMonth"), months);
    animateNumber(document.getElementById("changeDay"), days);

    // Clear input fields
    document.getElementById("day").value = "";
    document.getElementById("month").value = "";
    document.getElementById("year").value = "";
});

function animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    const increment = target > current ? 1 : -1;
    let currentValue = current;

    const animation = setInterval(() => {
        if (currentValue === target) {
            clearInterval(animation);
        } else {
            currentValue += increment;
            element.textContent = currentValue;
        }
    }, 50);
}
