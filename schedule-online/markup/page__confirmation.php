<div class="confirmation_page pages">
        <!-- THE CONFIRMATION PAGE -->
        <!-- this page will basically show a preview of all the user's inputs. This helps the user to varify the
            informations they putted into the input fields -->

        <!-- The main heading of the confirmation page -->
        <h1 class="page_heading"><span>does this look right ?</span></h1>

        <div class="section_confirmation_container">
          <!-- THE MAIN CONTAINER OF THE CONFIRMATION PAGE -->
          <!-- the layout of this page more looks a table like structure. here the elements with the class 'labels'
              are the labels of the information. The empty elements will be filled up by JavaScript -->

          <h3 class="service_name_heading labels"><span>service name:</span></h3>
          <span class="service_name_box"><span class="service_name_preview"></span></span>

          <h3 class="appointment_time_heading labels"><span>service time:</span></h3>
          <span class="appointment_time_preview">
            <br />
            <span class="attention">*Please allow the technician a two hours arrival window</span>
          </span>

          <h3 class="service_location_heading labels"><span>service location:</span></h3>
          <span class="service_location_preview"></span>

          <h3 class="customer_details_heading labels"><span>customer details:</span></h3>
          <span class="customer_details_box">
            <span class="customer_name_preview"></span>
            <span class="customer_phone_preview"></span>
            <span class="customer_email_preview"></span>
          </span>

          <h3 class="billing_details_heading labels"><span>billing details:</span></h3>
          <span class="billing_details_preview">
            <br />
            <span class="attention">**The card will not be charged until after service is complete</span>
          </span>

          <h3 class="total_amount_heading labels"><span>total amount:</span></h3>
          <span class="total_amount_preview"></span>

          <h3 class="service_note_heading labels"><span>serivice note:</span></h3>
          <span class="service_note_preview"></span>
        </div>
      </div>