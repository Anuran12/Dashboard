function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
  }
  
  function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append(
      "<div class='slice popover-item " + sliceID + "' data-tooltip-text='this shape is blue'><span></span></div>"
    );
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
  
    $(id + " ." + sliceID).css({
      transform: "rotate(" + offset + "deg) translate3d(0,0,0)"
    });
  
    $(id + " ." + sliceID + " span").css({
      transform: "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
      "background-color": color
    });
  }
  
  function iterateSlices(
    id,
    sliceSize,
    pieElement,
    offset,
    dataCount,
    sliceCount,
    color
  ) {
    var maxSize = 179,
      sliceID = "s" + dataCount + "-" + sliceCount;
  
    if (sliceSize <= maxSize) {
      addSlice(id, sliceSize, pieElement, offset, sliceID, color);
    } else {
      addSlice(id, maxSize, pieElement, offset, sliceID, color);
      iterateSlices(
        id,
        sliceSize - maxSize,
        pieElement,
        offset + maxSize,
        dataCount,
        sliceCount + 1,
        color
      );
    }
  }
  
  function createPie(id) {
    var listData = [],
      listTotal = 0,
      offset = 0,
      i = 0,
      pieElement = id + " .pie-chart__pie";
    dataElement = id + " .pie-chart__legend";
  
    color = [
      "cornflowerblue",
      "olivedrab",
      "orange",
      "tomato",
      "crimson",
      "purple",
      "turquoise",
      "forestgreen",
      "navy"
    ];
  
    color = shuffle(color);
  
    $(dataElement + " span").each(function () {
      listData.push(Number($(this).html()));
    });
  
    for (i = 0; i < listData.length; i++) {
      listTotal += listData[i];
    }
  
    for (i = 0; i < listData.length; i++) {
      var size = sliceSize(listData[i], listTotal);
      iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
      $(dataElement + " li:nth-child(" + (i + 1) + ")").css(
        "border-color",
        color[i]
      );
      offset += size;
    }
  }
  
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  
    return a;
  }
  
  function createPieCharts() {
    createPie(".pieID--micro-skills");
    createPie(".pieID--operations");
  }
  
  createPieCharts();






  /* Script for popover positioning */ 
(function(selector, horizontalOffset, verticalOffset) {
  var items;
  
  selector = selector || '.popover-item';
  horizontalOffset = horizontalOffset || 5;
  verticalOffset = verticalOffset || 5;
  
  items = document.querySelectorAll(selector);
  items = Array.prototype.slice.call(items);
  
  items.forEach(function(item) {
    // Every time the pointer moves over the element the 
    //  CSS-rule in overwritten with new values for 
    //  top and left.
    item.addEventListener('mousemove', function(e) {
      let countCssRules = document.styleSheets[0].cssRules.length;
      var rightSpace = document.body.clientWidth - e.pageX;
      if( rightSpace > 300 ){
        var newRule = selector +
        ':hover .popover-content {  ' + 
                       'right:auto; left: ' + (horizontalOffset + e.offsetX) + 'px; ' +
                       'top: ' +  (e.offsetY + verticalOffset) + 'px; }';
      }else{
         var newRule = selector +
        ':hover .popover-content {  ' + 
                       'left:auto; right: ' + (item.offsetWidth - e.offsetX) + 'px; ' +
                       'top: ' +  (e.offsetY + verticalOffset) + 'px; }';
      }
     
      
      document.styleSheets[0].insertRule(newRule, countCssRules);
    });
  });
})('.popover-item', 10, 5);












// Collect all elements with "shape" class
var shapesCollection = document.getElementsByClassName("popover-item");

// Get the tooltip container
var tooltip = document.getElementById('tooltip');

// Add events for tooltip creation
for (var i = 0; i < shapesCollection.length; i++) {
   shapesCollection[i].addEventListener('mousemove', showTooltip);
   shapesCollection[i].addEventListener('mouseout', hideTooltip);
}

function showTooltip(evt) {
   
   // Set tooltip to visible
   tooltip.style.visibility = "visible"
   
   // Updates position of the tooltip when the pointer is moving
   // (Mouse coordinates relative to client area + arbitrary offset)
   tooltip.style.top = (evt.clientY + 20) + "px";
   tooltip.style.left = (evt.clientX + 15) + "px";
   
   // Change text inside the tooltip getting text from the relative attribute on the hovered div 
   tooltip.innerHTML = evt.target.getAttributeNS(null, "data-tooltip-text");
}

// Shut down tooltip when mouse pointer leaves the shape 
function hideTooltip() {
   tooltip.style.visibility = "hidden"
}
  