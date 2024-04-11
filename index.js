$(document).ready(function () {
  $("#calculate").on("click", function () {
    $(".error-icon").each(function () {
      $(this).css("display", "none");
      $(this).tooltip("hide");
    });

    var age = $("#age").val();
    var income = $("#income").val().trim();
    var deductions = $("#deductions").val().trim();

    var errors = [];
    if (!age) {
      showError("age", "Age is required");
      errors.push("age");
    }
    if (isNaN(income) || income === "" || parseFloat(income) < 0) {
      showError("income", "Invalid income");
      errors.push("income");
    }
    if (isNaN(deductions) || deductions === "" || parseFloat(deductions) < 0) {
      showError("deductions", "Invalid deductions");
      errors.push("deductions");
    }

    if (errors.length > 0) {
      return;
    }

    var taxAmount = calculateTax(
      age,
      parseFloat(income),
      parseFloat(deductions)
    );

    $("#result").html("Tax Amount:Rs " + taxAmount.toFixed(2));
    $("#resultModal").modal("show");
  });

  function showError(fieldId, errorMessage) {
    var errorIcon = $("#" + fieldId + "-error-icon");
    errorIcon.css("display", "inline");
    errorIcon.attr("title", errorMessage);
    errorIcon.tooltip("show");
  }

  function calculateTax(age, income, deductions) {
    let taxRate = 0.3;
    if (age === ">=40 <60") {
      taxRate = 0.4;
    } else if (age === ">=60") {
      taxRate = 0.1;
    }

    let taxableIncome = Math.max(0, income + deductions - 800000);

    let taxAmount = 0;
    if (taxableIncome > 0) {
      taxAmount = taxRate * taxableIncome;
    }
    return taxAmount;
  }
});
