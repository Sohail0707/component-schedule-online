<div class="time_slot_page pages">
        <!-- THE SELECT TIME SLOT PAGE -->

        <!-- The main heading of the select time slot page -->
        <h1 class="page_heading"><span>choose your appointment time</span></h1>

        <div class="section_time_slot_container">
          <div class="date_service_container">
            <div class="selected_items_preview_container">
              <!-- This container holds the preview of their previous input. In this case, it is the service name 
                  with the serviceing time and the entered address. The content of this section will be added by the
                  JavaScript -->
            </div>

            <!-- This is the date input element. -->
            <div class="date_box"><input type="date" name="service_date" id="service_date" /></div>
          </div>

          <div class="timeslot_container">
            <!-- This is the main conteiner of the time slot page. It has a container to display the time slot elements.
                And a button to display more time slots -->

            <ul class="slot_list">
              <!-- This container will contain the time slot elements, which will be added by JavaScript. By default it
                  will contain a loading animation element. -->

              <div class="animate_container">
                <div class="label animate_element"></div>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
                <li class="animate_element last_slot_of_date"></li>

                <div class="label animate_element"></div>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
                <li class="animate_element"></li>
              </div>
            </ul>

            <!-- This button is to generate new time slots -->
            <button type="button" class="btn_see_more"><span>see more slots</span></button>
          </div>
        </div>
      </div>