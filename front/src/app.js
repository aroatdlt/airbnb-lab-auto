console.log('Running front app');

fetch('/api/accommodations?country=Portugal')
  .then((response) => {
    return response.json();
  })
  .then((accommodations) => {
    console.log({ accommodations });
  });