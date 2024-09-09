<div class="location_page pages">
        <!-- THE ENTER ADDRESS PAGE -->

        <!-- the main heading of the enter address page -->
        <h1 class="page_heading"><span>enter the address where you want us to come</span></h1>

        <div class="section_location_container">
          <!-- This section has an input element where the user will start typing their address. The google map API
              will display some suggestions into the location list container. The has to click one of the suggestion
              and that text will be selected as the users address -->

          <div class="selected_items_preview_container">
            <!-- This container holds the preview of their previous input. In this case, it is the service name 
                and the serviceing time. The content of this section will be added by the JavaScript -->
          </div>

          <!-- This is the common structure of each input elements of this entire Schedule-Online module -->
          <div class="address_box input_box">
            <input class="input_field" type="text" name="address" id="address" placeholder="Ex- 2021 K Street Northwest, Washington, DC, USA" />
            <label for="address"><span>address</span></label>
          </div>

          <div class="location_list_container">
            <ul class="location_list">
              <!-- Here, the location list will be placed by the JavaScript gettin form the google map API based on
                the users input into the input field -->
            </ul>
          </div>
        </div>
      </div>