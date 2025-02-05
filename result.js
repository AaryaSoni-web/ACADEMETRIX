function updateDropdown(buttonId, placeholder, value) {
  const button = document.getElementById(buttonId);
  button.textContent = value ? value : placeholder; // Update the button's text
  button.classList.toggle('no-arrow', value !== placeholder); // Add or remove the arrow-hiding class
  if (value === "1") {
    button.style.backgroundColor = "red";
  } else if (value === "2") {
    button.style.backgroundColor = "yellow";
  } else {
    button.style.backgroundColor = ""; // Reset to default if no value is selected
  }
}
fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#dataTable tbody');
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row['Sr.No.']}</td>
        <td>${row['Enrollment No']}</td>
        <td>${row['Name']}</td>
        <td>${row['SGPA']}</td>
        <td>${row['HMC 110']}</td>
        <td>${row['BAI 110']}</td>
        <td>${row['BAI 101']}</td>
        <td>${row['BAI 103']}</td>
        <td>${row['BAS 107']}</td>
        <td>${row['BAS 109']}</td>
      `;
      tableBody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
