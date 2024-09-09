<section id="__SCHEDULE-ONLINE__LARGE" class="__SCHEDULE-ONLINE__LARGE" color_scheme="SCHEDULE_LARGE__1">
  <!-- THIS IS THE MAIN OUTER CONTAINER OF THE SCHEDULE-ONLIE MODULE -->

  <main class="schedule-online__container">
    <!-- A NESTED CONTAINER THAT WILL CONTAIN THE ACTUAL ELEMENTS -->
    <?php include 'markup/indicator.php'; ?>

    <div class="main_page_container">
      <!-- THIS IS THE PARENT CONTAINER OF ALL THE PAGES OF THIS MODULE -->
      <?php include 'markup/page__service.php'; ?>
    </div>

    <div class="schedule-online__navigation">
      <button type="button" class="schedule-online__btn schedule-online__btn--previous">
          <span class="text">previous</span>
      </button>

      <button type="button" class="schedule-online__btn schedule-online__btn--next">
          <span class="text">next</span>
      </button>

      <button type="button" class="schedule-online__btn schedule-online__btn--schedule">
          <span class="text">schedule</span>
      </button>

      <button type="button" class="schedule-online__btn schedule-online__btn--close">
          <span class="text">close</span>
      </button>
    </div>
  </main>
</section>