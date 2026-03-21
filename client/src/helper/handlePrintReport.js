export const handlePrintReport = (item) => {
  const printWindow = window.open("", "_blank");

  const htmlContent = `
    <html>
      <head>
        <title>Print Report</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <style>
          body { padding: 20px; }
          h2 { text-align: center; margin-bottom: 30px; }
          .table th, .table td { vertical-align: middle; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Result Report</h2>
          <table class="table table-bordered">
            <tbody>
              <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
              <tr><th>Email</th><td>${item.examineeEmail}</td></tr>
              <tr><th>Exam Title</th><td>${item.examTitle}</td></tr>
              <tr><th>Score</th><td>${item.score}</td></tr>
              <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
              <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
              <tr><th>Status</th><td>${item.status}</td></tr>
              <tr><th>Result Status</th><td>${item.resultStatus}</td></tr>
              <tr><th>Attempted At</th><td>${new Date(
                item.attemptedAt
              ).toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
