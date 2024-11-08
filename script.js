document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("email");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");
    const addressInput = document.getElementById("address");

    // Email validation pattern
    emailInput.addEventListener("input", () => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailInput.setCustomValidity(emailPattern.test(emailInput.value) || emailInput.value === "" ? "" : "Invalid email format");
    });

    // Sample data for city and state suggestions (can be replaced with an API call)
    const citySuggestions = ["Zurich", "Geneva", "Basel", "Lausanne", "Bern"];
    const stateSuggestions = ["ZH", "GE", "BS", "VD", "BE"];
    
    function autocomplete(input, suggestions) {
        input.addEventListener("input", function() {
            let list, item;
            closeAllLists();
            if (!this.value) return false;

            list = document.createElement("div");
            list.setAttribute("class", "autocomplete-list");
            this.parentNode.appendChild(list);

            suggestions.forEach((suggestion) => {
                if (suggestion.toLowerCase().startsWith(this.value.toLowerCase())) {
                    item = document.createElement("div");
                    item.innerHTML = `<strong>${suggestion.substr(0, this.value.length)}</strong>${suggestion.substr(this.value.length)}`;
                    item.addEventListener("click", () => {
                        input.value = suggestion;
                        closeAllLists();
                    });
                    list.appendChild(item);
                }
            });
        });
    }

    function closeAllLists() {
        const items = document.getElementsByClassName("autocomplete-list");
        Array.from(items).forEach(item => item.parentNode.removeChild(item));
    }

    document.addEventListener("click", (e) => closeAllLists(e.target));

    autocomplete(cityInput, citySuggestions);
    autocomplete(stateInput, stateSuggestions);

    // Form validation and submission
    function validateForm() {
        const requiredFields = document.querySelectorAll("#client-details input[required], #service-location input[required], #scheduled input[required]");
        let isValid = true;

        for (let field of requiredFields) {
            if (!field.value) {
                field.classList.add("invalid"); // Отметим поле как невалидное
                field.setCustomValidity("Please fill out this field.");
                isValid = false;
            } else {
                field.classList.remove("invalid"); // Убираем ошибку, если поле заполнено
                field.setCustomValidity("");
            }
        }

        return isValid;
    }

    window.createJob = function() {
        if (validateForm()) {
            alert("Job Created Successfully!");
            // Здесь будет логика отправки данных на сервер
        } else {
            alert("Please fill all required fields correctly.");
        }
    };

    window.saveInfo = function() {
        if (validateForm()) {
            alert("Information Saved!");
            // Логика сохранения данных
        }
    };
});
