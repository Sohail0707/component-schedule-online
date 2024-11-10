<section id="__SCHEDULE-ONLINE__LARGE" class="__SCHEDULE-ONLINE__LARGE" color_scheme="SCHEDULE_LARGE__1">
	<!-- THIS IS THE MAIN OUTER CONTAINER OF THE SCHEDULE-ONLIE MODULE -->

	<main class="schedule-online__container">
		<!-- A NESTED CONTAINER THAT WILL CONTAIN THE ACTUAL ELEMENTS -->
		<?php include 'markup/components/indicator.php'; ?>

		<!-- THIS IS THE PARENT CONTAINER OF ALL THE PAGES OF THIS MODULE -->
		<div class="schedule-online__page-container">
			<div class="page page__service">
				<!-- THE SELECT SERVICE PAGE -->
				<h1 class="page-heading">
					<span>select one you want</span>
				</h1>

				<!-- this buttons will be only visible in mobile -->
				<div class="service__btn-level-container">
					<button class="service__btn-level service__btn-level--top clicked">
						<span class="text">top</span>
					</button>

					<button class="service__btn-level service__btn-level--middle">
						<span class="text">middle</span>
					</button>

					<button class="service__btn-level service__btn-level--basic">
						<span class="text">basic</span>
					</button>
				</div>

				<div class="service__category-container">
					<div class="service__category service__category--top">
						<span class="service__category--label">
							<span class="text">top</span>
						</span>
						<div class="service__el-container">
							<span class="service__el-btn--left service__el-btn">
								<icon name="arrow_left"></icon>
							</span>
							<span class="service__el-btn--right service__el-btn">
								<icon name="arrow_right"></icon>
							</span>
							<div class="service__el-container--1">
								<!-- This will contain the actual service cards -->
							</div>
						</div>
					</div>

					<div class="service__category service__category--middle">
						<span class="service__category--label">
							<span class="text">middle</span>
						</span>
						<div class="service__el-container">
							<span class="service__el-btn--left service__el-btn">
								<icon name="arrow_left"></icon>
							</span>
							<span class="service__el-btn--right service__el-btn">
								<icon name="arrow_right"></icon>
							</span>
							<div class="service__el-container--1">
								<!-- This will contain the actual service cards -->
							</div>
						</div>
					</div>

					<div class="service__category service__category--basic">
						<span class="service__category--label">
							<span class="text">basic</span>
						</span>
						<div class="service__el-container">
							<span class="service__el-btn--left service__el-btn">
								<icon name="arrow_left"></icon>
							</span>
							<span class="service__el-btn--right service__el-btn">
								<icon name="arrow_right"></icon>
							</span>
							<div class="service__el-container--1">
								<!-- This will contain the actual service cards -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="schedule-online__navigation">
			<!-- Navigation buttons goes here -->
		</div>
	</main>
</section>
