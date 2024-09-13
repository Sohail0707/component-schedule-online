<div class="page page-location">
  <h1 class="page-heading">
    <span>enter the address where you want us to come</span>
  </h1>
  <div class="location__container">
    <div class="selected-item">
      <!-- the previously selected item will go here -->
    </div>

    <div class="location__input-box input-box">
      <div class="input__error" aria-live="assertive">
      </div>

      <input class="input-field" type="text" name="address" id="address" placeholder="Ex- 2021 K Street Northwest, Washington, DC, USA" />

      <label for="address">
        <span class="text">address</span>
      </label>

      <div class="loading-spinner"></div>

      <icon name="excalmation">
      <icon name="checkmark_circle_outline">
    </div>
    <ul class="location__prediction--list">
      <!-- Here, the location list will be placed by the JavaScript getting form the google map API based on the users input into the input field -->
    </ul>
  </div>
</div>