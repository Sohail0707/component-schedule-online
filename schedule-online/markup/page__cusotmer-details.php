<div class="customer_details_page pages">
        <!-- THE CUSTOMER DETAILS PAGE -->

        <!-- The main heading of customer details page -->
        <h1 class="page_heading"><span>let us know about you</span></h1>

        <div class="section_customer_details_container">
          <!-- THE MAIN CONTAINER OF THE CUSTOMER DETAILS PAGE -->
          <!-- This contaner has 5 different input elements. first name, last name, phone number, email ID & notes.
              the structure of each input element is the default structure of an input element -->

          <div class="name_container">
            <div class="first_name_box input_box">
              <input class="input_field" type="text" name="first_name" id="first_name" placeholder="John" disabled />
              <label for="first_name"><span>first name</span></label>
            </div>
            <div class="lase_name_box input_box">
              <input class="input_field" type="text" name="last_name" id="last_name" placeholder="Smith" disabled />
              <label for="last_name"><span>last name</span></label>
            </div>
          </div>

          <div class="contact_container">
            <div class="phone_num_box input_box">
              <input class="input_field" type="text" name="phone_num" id="phone_num" placeholder="+1 (000) 000 0000" disabled />
              <label for="phone_num"><span>phone number</span></label>
            </div>
            <div class="email_box input_box">
              <input class="input_field" type="email" name="email" id="email" placeholder="xyz@example.ab" disabled />
              <label for="email"><span>email</span></label>
            </div>
          </div>

          <div class="customer_notes_box input_box">
            <textarea class="input_field" name="customer_notes" id="customer_notes" placeholder="extra details that you want us to know (maximum 500 letter)"></textarea>
            <label for="customer_notes"><span>notes (optional)</span></label>
          </div>
        </div>
      </div>