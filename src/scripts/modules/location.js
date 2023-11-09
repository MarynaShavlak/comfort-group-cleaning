const backdrop = document.querySelector('.backdrop--subscr');

const locationInputList = document.querySelectorAll('.form__input--location');

if (!window.initMap) {
  window.initMap = function () {
    locationInputList.forEach(function (locationInput) {
      const autocomplete = new google.maps.places.Autocomplete(locationInput);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        locationInput.setAttribute('data-id', locationInput.value);
      });
    });
  };
}

function handleInputFocusAndNotEmpty(event) {
  const locationInput = event.target;
  if (backdrop) {
    if (
      locationInput.value.trim() !== '' &&
      document.activeElement === locationInput
    ) {
      backdrop.style.overflow = 'hidden';
    } else {
      backdrop.style.overflow = 'auto';
    }
  }
}

locationInputList.forEach(function (locationInput) {
  locationInput.addEventListener('input', handleInputFocusAndNotEmpty);
  locationInput.addEventListener('focus', handleInputFocusAndNotEmpty);
  locationInput.addEventListener('blur', handleInputFocusAndNotEmpty);

  handleInputFocusAndNotEmpty({ target: locationInput });
});


