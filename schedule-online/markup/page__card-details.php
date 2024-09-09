<div class="card_details_page pages">
        <!-- THE CARD DETAILS PAGE -->

        <!-- The main heading of the card details page -->
        <h1 class="page_heading"><span>Enter your credit card details</span></h1>

        <div class="section_card_details_container">
          <!-- THE MAIN CONTAINER OF THE CARD DETAILS PAGE -->
          <!-- this container has 5 different input elements. card number, expiration date, CVV, billing zip code. -->

          <div class="card_details_container">
            <div class="card_number_box input_box">
              <input class="input_field" type="text" name="card_number" id="card_number" placeholder="xxxx-xxxx-xxxx-xxxx" disabled />
              <label for="card_number"><span>card number</span></label>
            </div>

            <div class="expiration_date_box input_box">
              <input class="input_field" type="text" name="expiration_date" id="expiration_date" placeholder="MM / YYYY or MM / YY" disabled />
              <label for="expiration_date"><span>expiration</span></label>
            </div>

            <div class="cvv_box input_box">
              <input class="input_field" type="text" name="cvv" id="cvv" placeholder="123" disabled />
              <label for="cvv"><span>CVV</span></label>
            </div>

            <div class="billing_zipcode_box input_box">
              <input class="input_field" type="text" name="billing_zipcode" id="billing_zipcode" placeholder="Ex- 20001" disabled />
              <label for="billing_zipcode"><span>card billing zipcode</span></label>
            </div>

            <div class="conditions_box">
              <!-- This contains some condition related to the input field information -->

              <h3 class="condition">The card will not be charged until after service is complete.</h3>
              <h3 class="condition">We never disclose any information of customer.</h3>
            </div>
          </div>

          <div class="card_preview_container">
            <h2 class="card_preview_tagline"><span>we proudly accept</span></h2>
            <div class="card_preview_box">
              <span class="card_img">
                <img src="./schedule-online/assets/mastercard.svg" alt="mastercard logo" />
              </span>

              <span class="card_img"><img src="./schedule-online/assets/visa.svg" alt="visa logo" /></span>

              <span class="card_img">
                <img src="./schedule-online/assets/american express.svg" alt="american express logo" />
              </span>

              <span class="card_img">
                <img src="./schedule-online/assets/discover.svg" alt="discover logo" />
              </span>
            </div>
          </div>
        </div>
      </div>