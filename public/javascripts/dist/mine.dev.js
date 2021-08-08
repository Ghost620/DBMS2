"use strict";

$("#delete").click(function () {
  alert("You are deleting an entry");
});
$("#btnsearch").click(function () {
  val = $("#search").val();
});
ha = $(".rw");
var selectbox = document.getElementById('selectbox');
var j = 0;
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = ha[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    i = _step.value;
    var option = document.createElement("option");
    option.text = i.innerText;
    option.value = i.innerText;
    selectbox.add(option, selectbox[j]);
    j++;
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
//# sourceMappingURL=mine.dev.js.map
