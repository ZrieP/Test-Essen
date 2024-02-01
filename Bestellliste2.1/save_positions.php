<?php
// save_positions.php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request body
    $data = file_get_contents('php://input');

    // Decode JSON data
    $positions = json_decode($data, true);

    // TODO: Implement code to save $positions to your database or file

    // Example: Save positions to a file (replace this with your actual saving logic)
    file_put_contents('positions.json', json_encode($positions));

    // Send a response back to the client
    echo 'Positions saved successfully.';
} else {
    // Handle invalid request method
    http_response_code(405); // Method Not Allowed
    echo 'Invalid request method.';
}
?>