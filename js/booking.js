/**
 * Module: Booking Shoot Logic, API Dispatch & Feedback
 */
export function initBooking() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const service = document.getElementById('shootService').value;
    const date = document.getElementById('shootDate').value;
    const message = document.getElementById('clientNotes').value.trim();

    if (!name || !phone || !service || !date) {
      showToast('કૃપા કરીને જરૂરી વિગતો ભરો (Please fill required fields)', 'error');
      return;
    }

    const bookingPayload = {
      id: 'AKR_' + Date.now(),
      name,
      phone,
      service,
      date,
      message,
      createdAt: new Date().toISOString()
    };

    // Client-side local storage backup
    let allBookings = JSON.parse(localStorage.getItem('aakar_bookings') || '[]');
    allBookings.push(bookingPayload);
    localStorage.setItem('aakar_bookings', JSON.stringify(allBookings));

    // Try posting to Node.js backend if active, else gracefully fallback
    try {
      fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      }).catch(() => {});
    } catch (err) {}

    showToast(`આભાર ${name}! તમારું શૂટ બુકિંગ Aakar Films એ સ્વીકારી લીધું છે.`, 'success');
    form.reset();
  });
}

export function showToast(message, type = 'success') {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
