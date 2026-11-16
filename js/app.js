/**
 * Main Application Orchestrator
 */
import { initNavbar } from './navigation.js';
import { initPortfolio } from './portfolio.js';
import { initCounter } from './counter.js';
import { initBooking } from './booking.js';
import { initBackgroundVideo } from './video-handler.js';

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundVideo();
  initNavbar();
  initPortfolio();
  initCounter();
  initBooking();
});
