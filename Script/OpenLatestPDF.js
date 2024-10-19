function openLastDownloadedFile() {
  // Delay to ensure file download is complete
  Delay(10000);

  var fso = Sys.OleObject("Scripting.FileSystemObject");

  // Get the user's home directory from environment variables
  var shell = Sys.OleObject("WScript.Shell");
  var homeFolder = shell.ExpandEnvironmentStrings("%USERPROFILE%");
  var downloadFolder = homeFolder + "\\Downloads";

  // Check if the Downloads folder exists
  if (!fso.FolderExists(downloadFolder)) {
    Log.Error("Downloads folder not found: " + downloadFolder);
    return;
  }

  // Get all files in the Downloads folder
  var folder = fso.GetFolder(downloadFolder);
  var files = new Enumerator(folder.Files);

  var latestFile = null;
  var latestDate = new Date(0);  // Initialize with the minimum date

  // Loop through the files to find the most recent one
  for (; !files.atEnd(); files.moveNext()) {
    var file = files.item();
    if (file.DateLastModified > latestDate) {
      latestDate = file.DateLastModified;
      latestFile = file;
    }
  }

  // If a recent file is found, proceed
  if (latestFile) {
    Log.Message("The most recent file is: " + latestFile.Name);

    // Construct full path to the PDF
    var pdfPath = downloadFolder + "\\" + latestFile.Name;

    // Check if the latest file is a PDF
    if (aqFileSystem.GetFileExtension(pdfPath).toLowerCase() === "pdf") {
      // Open the PDF file using the default PDF viewer
      shell.Run('"' + pdfPath + '"');  // Open the PDF file

      // Convert the PDF content to text
      var contents = PDF.ConvertToText(pdfPath);

      if (contents !== "") {
        // Variables to search for
        var quote_id = Project.Variables.quote_id;
        var commodity = Project.Variables.commodity;
        var origin = Project.Variables.origin.split(',')[0].trim();
        var destination = Project.Variables.destination.split(',')[0].trim();

        // Array of variables to check
        var variablesToCheck = {
          quote_id: quote_id,
          commodity: commodity,
          origin: origin,
          destination: destination
        };

        // Check if each variable is present in the PDF content
        for (var key in variablesToCheck) {
          var value = variablesToCheck[key];
          if (contents.indexOf(value) !== -1) {
            Log.Message("The PDF contains " + key + ": " + value);
          } else {
            Log.Error("The PDF does NOT contain " + key + ": " + value);
          }
        }
      } else {
        Log.Error("The PDF is empty or its content could not be extracted.");
      }
    } else {
      Log.Error("The latest file is not a PDF.");
    }
  } else {
    Log.Warning("No files found in the Downloads folder.");
  }
}
