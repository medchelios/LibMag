export const WelcomeMessage = (username: String) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LibMag</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    
    <!-- Header Section -->
    <tr>
      <td align="center" style="padding: 10px 0;">
        <img src="https://via.placeholder.com/150" alt="LibMag Logo" style="display: block; width: 100px; height: auto;">
      </td>
    </tr>

    <!-- Welcome Text -->
    <tr>
      <td align="center" style="padding: 10px 20px; color: #333333; font-size: 24px;">
        <h1 style="margin: 0; font-size: 28px;">Welcome to LibMag!</h1>
      </td>
    </tr>

    <!-- Body Text -->
    <tr>
      <td style="padding: 20px; color: #666666; font-size: 16px; line-height: 1.6;">
        <p>Hi ${username},</p>
        <p>We are thrilled to welcome you to <strong>LibMag</strong>, your go-to platform for managing your library experience. Whether you're checking out books or managing your collection, we've got you covered.</p>
        <p>Here's a quick overview of what you can do:</p>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li>Browse and borrow books</li>
          <li>Manage your borrowed items</li>
          <li>Pay fines and track your reading history</li>
        </ul>
        <p>If you ever need assistance, don't hesitate to reach out to our support team. We're here to help you make the most of LibMag.</p>
        <p>Happy reading!</p>
        <p>The LibMag Team</p>
      </td>
    </tr>

    <!-- Button -->
    <tr>
      <td align="center" style="padding: 20px;">
        <a href="https://www.libmag.com" target="_blank" style="padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">Get Started</a>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 20px; color: #999999; font-size: 12px;">
        <p>&copy; 2024 LibMag. All rights reserved.</p>
        <p>If you have any questions, visit our <a href="mailto:help@libmag.com" target="_blank" style="color: #007BFF; text-decoration: none;">Help Center</a>.</p>
      </td>
    </tr>

  </table>

</body>
</html>`
}