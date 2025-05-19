async function fetchData() {
    let userId = document.getElementById("UserIdNumber").value.trim(); // Use .trim() to remove extra spaces
    document.getElementById("searching_record").style.display = "block";
    document.getElementById("user_image").style.display = "none";

    if (userId === "") {
        return alert("Please enter your ID first.");
    }

    try {
        let response = await fetch("style.json"); // Make sure the path to the JSON file is correct.
        if (!response.ok) {
            throw new Error("Failed to fetch the data.");
        }

        let data = await response.json();

        // Check if the record exists for the entered userId
        if (data[userId]) {
            let firstName = data[userId].name;
            let lastName = data[userId].last;
            let userImage = data[userId].image;
            let status = data[userId].status;

            // Display the first and last name
            document.getElementById("form_input-First").innerText = firstName.toUpperCase();
            document.getElementById("form_input-last").innerText = lastName.toUpperCase();

            // Display the user image
            document.getElementById("user_image").innerHTML = `<img src="${userImage}" width="200px" alt="User Image" />`;

            // If the status is "Suspected", add a stamp
            if (status === "Suspected") {
                document.getElementById("user_image").innerHTML += `<img id="sus-img" src="/stamp.png" width="150px" alt="Suspected Stamp" />`;
            }
        } else {
            // If the userId is not found in the data
            document.getElementById("form_input_error").innerText = "No data found for this ID.";
            document.getElementById("form_input-First").innerText = "";
            document.getElementById("form_input-last").innerText = "";
            document.getElementById("user_image").innerHTML = "";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("form_input_error").innerText = `Error: ${error.message}`;
    } finally {
        document.getElementById("searching_record").style.display = "none"; // Hide the loading message
        document.getElementById("user_image").style.display = "block"; // Show the image section
    }
}
