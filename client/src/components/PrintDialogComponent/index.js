import printDialogCSS from "./PrintDialogCSS";

const PrintDialogComponent = (itemList) => {
  let w = window.open();

  let html =
    "<!DOCTYPE HTML>" +
    '<html lang="en-us">' +
    "<head></head>" +
    "<body>" +
    "<div class='container'>" +
    "<ul>";
  itemList.forEach((item) => {
    html += "<li>" + item + "</li>";
  });
  html += "</ul></div></body>";
  w.document.write(html);

  let styleSheet = w.document.createElement("style");
  styleSheet.innerText = printDialogCSS;
  w.document.body.appendChild(styleSheet);

  w.window.print();
  w.document.close();
};

export default PrintDialogComponent;
